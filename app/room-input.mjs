/** Shared input rules for human and agent contributions. No network or identity claims. */
export function textField(value, label, max, fallback = '') {
  if (typeof value !== 'string' && value != null)
    throw new Error(`${label} must be text.`);
  const text = (value ?? '').trim();
  if (text.length > max)
    throw new Error(`${label} must be ${max} characters or fewer.`);
  if (!text && !fallback) throw new Error(`${label} is required.`);
  return text || fallback;
}
export function makeSpark(input, id) {
  const author = textField(input.author, 'Name', 120, 'You');
  return {
    id,
    author,
    observation: textField(input.observation, 'Observation', 900),
    mayMatter: textField(
      input.mayMatter,
      'Why it matters',
      700,
      'Still discovering why this matters.',
    ),
    uncertainty: textField(
      input.uncertainty,
      'Uncertainty',
      700,
      'This is unfinished. Questions and different perspectives are welcome.',
    ),
    consent: 'Keep context and ask before taking it elsewhere.',
    credit: author,
  };
}
export function loadDraft(storage) {
  try {
    const value = JSON.parse(storage.getItem('spark-draft-v1') || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(
      ['author', 'observation', 'mayMatter', 'uncertainty']
        .filter((k) => typeof value[k] === 'string')
        .map((k) => [
          k,
          value[k].slice(
            0,
            k === 'author' ? 120 : k === 'observation' ? 900 : 700,
          ),
        ]),
    );
  } catch {
    return {};
  }
}
export function saveDraft(storage, draft) {
  try {
    storage.setItem('spark-draft-v1', JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}
export const contributionFields = {
  ember: [
    ['author', 'Your name', 120],
    ['text', 'What caught your attention?', 700],
  ],
  experiment: [
    ['question', 'What are we curious about?', 700],
    ['test', 'One small thing to try', 900],
    ['contact', 'Who or what can give a real response?', 500],
    ['change', 'What result would change your mind?', 700],
    ['boundary', 'What must we respect?', 700],
    ['steward', 'Who will take the next step?', 300],
  ],
  returned: [
    ['learned', 'What actually happened?', 900],
    ['changed', 'What changed in your understanding?', 900],
    ['nextSpark', 'What question remains?', 700],
    ['credit', 'Who helped, and who should hear back?', 600],
  ],
};
export function contribute(room, action, input, id) {
  if (room.withdrawn)
    throw Error('This spark is withdrawn. Start a new spark to contribute.');
  if (!Object.hasOwn(contributionFields, action))
    throw Error('Unknown contribution.');
  if (action === 'experiment' && !room.embers.length)
    throw Error('Add a perspective before shaping a test.');
  if (action === 'returned' && !room.experiment)
    throw Error('Shape and try a test before returning learning.');
  const fields = Object.fromEntries(
    contributionFields[action].map(([key, label, max]) => [
      key,
      textField(input[key], label, max),
    ]),
  );
  if (action === 'ember')
    return {
      ...room,
      embers: [
        ...room.embers,
        { id, kind: 'caught', ...fields, source: sourceLink(input.source) },
      ],
    };
  if (action === 'experiment' && room.returned)
    throw Error(
      'This test already has a return. Start a new spark for a different test.',
    );
  return {
    ...room,
    [action]:
      action === 'returned'
        ? {
            ...fields,
            capability: textField(
              input.capability,
              'Capability change',
              700,
              'Not assessed yet. Learning reported here is not proof of impact.',
            ),
          }
        : fields,
  };
}
export function sourceLink(value) {
  if (value == null || value === '') return '';
  const raw = textField(value, 'Source URL', 1000);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw Error('Use a complete http or https source URL.');
  }
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password
  )
    throw Error('Use a public http or https source URL without credentials.');
  url.hash = '';
  return url.href;
}
export function sourceSummary(embers) {
  const groups = new Map();
  let uncited = 0;
  for (const ember of embers) {
    if (!ember.source) {
      uncited++;
      continue;
    }
    const key = sourceLink(ember.source);
    groups.set(key, (groups.get(key) || 0) + 1);
  }
  return {
    references: embers.length - uncited,
    unique: groups.size,
    uncited,
    repeated: [...groups].filter(([, n]) => n > 1),
  };
}
export function withdrawSpark(room) {
  return {
    ...room,
    withdrawn: true,
    spark: {
      id: room.spark.id,
      author: 'Contributor withdrawn',
      observation: 'This spark has been withdrawn on this device.',
      mayMatter: '',
      uncertainty: '',
      consent: 'Withdrawn. Do not carry forward.',
      credit: 'Withdrawn',
    },
    embers: [],
    experiment: null,
    returned: null,
    secondProduct: '',
    activity: [{ tool: 'human_withdrawal', result: 'CONTENT REMOVED LOCALLY' }],
  };
}
export function reviseConsent(room, consent, credit) {
  if (room.withdrawn)
    throw Error('A withdrawn spark cannot be reactivated. Start a new one.');
  return {
    ...room,
    spark: {
      ...room.spark,
      consent: textField(consent, 'Sharing boundary', 500),
      credit: textField(credit, 'Credit', 400),
    },
  };
}
export function validateToolInput(input, schema) {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    throw Error('Input must be an object.');
  for (const key of Object.keys(input))
    if (!Object.hasOwn(schema.properties, key))
      throw Error(`Unknown field: ${key}`);
  for (const key of schema.required || [])
    if (!Object.hasOwn(input, key)) throw Error(`Missing field: ${key}`);
  const clean = {};
  for (const [key, value] of Object.entries(input)) {
    const rule = schema.properties[key];
    if (rule.type === 'string') {
      if (typeof value !== 'string') throw Error(`${key} must be text.`);
      if (!value.trim() || value.length > (rule.maxLength || 2000))
        throw Error(`${key} is empty or too long.`);
      if (rule.enum && !rule.enum.includes(value))
        throw Error(`Invalid ${key}.`);
      clean[key] = value.trim();
    } else throw Error(`Unsupported field: ${key}`);
  }
  return clean;
}
export function checkRoomMutation(room, name, input) {
  if (room.withdrawn && name !== 'offer_spark')
    throw Error('SPARK_WITHDRAWN: human must start a new spark.');
  if (input.expectedSparkId && input.expectedSparkId !== room.spark.id)
    throw Error('STALE_SPARK: read the room again.');
  if (name === 'shape_honest_test' && !room.embers.length)
    throw Error('Add a perspective before shaping a test.');
  if (name === 'return_value' && !room.experiment)
    throw Error('Shape and try a test before returning learning.');
  if (name === 'shape_honest_test' && room.returned)
    throw Error(
      'This test has a return. Start a new spark for a different test.',
    );
  if (room.embers.length >= 100 && ['add_ember', 'invite_agent'].includes(name))
    throw Error('Room contribution limit reached.');
  if (room.members.length >= 30 && name === 'join_room')
    throw Error('Room participant limit reached.');
}
export function restoreRoom(raw, fallback) {
  try {
    if (!raw) return { room: fallback, status: 'New local room' };
    if (raw.length > 200000) throw Error('Oversized room');
    const parsed = JSON.parse(raw);
    const value = parsed.version === 1 ? parsed.room : parsed;
    const strings = (obj, fields) =>
      Object.fromEntries(
        Object.entries(fields).map(([key, max]) => {
          if (typeof obj?.[key] !== 'string' || obj[key].length > max)
            throw Error('Invalid saved field');
          return [key, obj[key]];
        }),
      );
    if (
      !Array.isArray(value.members) ||
      value.members.length > 30 ||
      !Array.isArray(value.embers) ||
      value.embers.length > 100 ||
      !Array.isArray(value.activity) ||
      value.activity.length > 20
    )
      throw Error('Invalid saved collections');
    const spark = strings(value.spark, {
      id: 120,
      author: 120,
      observation: 900,
      mayMatter: 700,
      uncertainty: 700,
      consent: 500,
      credit: 400,
    });
    const members = value.members.map((m) => {
      if (!['human', 'agent'].includes(m.kind)) throw Error('Invalid role');
      return {
        ...strings(m, { id: 120, name: 120, kind: 10, role: 300 }),
        color: /^#[0-9a-f]{6}$/i.test(m.color) ? m.color : '#2475a8',
        ...(m.reportsTo
          ? { reportsTo: textField(m.reportsTo, 'Reporting line', 120) }
          : {}),
        ...(m.provider
          ? { provider: textField(m.provider, 'Provider', 120) }
          : {}),
      };
    });
    const embers = value.embers.map((e) => {
      if (!['caught', 'question', 'connection'].includes(e.kind))
        throw Error('Invalid ember');
      return {
        ...strings(e, { id: 120, author: 450, kind: 20, text: 700 }),
        source: sourceLink(e.source),
      };
    });
    const experiment = value.experiment
      ? strings(value.experiment, {
          question: 700,
          test: 900,
          contact: 500,
          change: 700,
          boundary: 700,
          steward: 300,
        })
      : null;
    const returned = value.returned
      ? {
          ...strings(value.returned, {
            learned: 900,
            changed: 900,
            nextSpark: 700,
            credit: 600,
          }),
          capability: textField(
            value.returned.capability,
            'Capability change',
            700,
            'Not assessed yet. Learning reported here is not proof of impact.',
          ),
        }
      : null;
    if (returned && !experiment) throw Error('Return without test');
    if (
      typeof value.secondProduct !== 'string' ||
      value.secondProduct.length > 800
    )
      throw Error('Invalid capability');
    const activity = value.activity.map((a) =>
      strings(a, { tool: 100, result: 150 }),
    );
    const room = {
      members,
      spark,
      embers,
      experiment,
      returned,
      secondProduct: value.secondProduct,
      activity,
      withdrawn: value.withdrawn === true,
    };
    return {
      room: room.withdrawn ? withdrawSpark(room) : room,
      status: 'Restored on this device',
    };
  } catch {
    return {
      room: fallback,
      status:
        'Saved room could not be restored. Original saved data was left untouched.',
    };
  }
}
export function nameCapability(room, value) {
  if (room.withdrawn)
    throw Error('Start a new spark before naming its purpose.');
  return {
    ...room,
    secondProduct: textField(value, 'What we want to become better at', 800),
  };
}
export function buildHandoff(room, input) {
  if (room.withdrawn) throw Error('Withdrawn sparks cannot be handed on.');
  return {
    format: 'spark-handoff',
    version: 1,
    status: 'DRAFT_NOT_SENT',
    to: textField(input.to, 'Recipient or room', 200),
    context: textField(input.context, 'Why this may matter to them', 700),
    permission: room.spark.consent,
    credit: room.spark.credit,
    reviewRequired: true,
    room: JSON.parse(JSON.stringify(room)),
    note: 'A portable local snapshot, not a live shared room. Permission is stated by the contributor, not independently verified. Ask before sharing; the receiver may decline.',
  };
}
export function persistWithdrawal(storage, room) {
  try {
    storage.setItem('spark-room-v4', JSON.stringify({ version: 1, room }));
    storage.removeItem('spark-room-v3');
    storage.removeItem('spark-draft-v1');
    return true;
  } catch {
    return false;
  }
}
