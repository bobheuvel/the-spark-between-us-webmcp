/** Shared input rules for human and agent contributions. No network or identity claims. */
export function textField(value, label, max, fallback = '') {
  if (typeof value !== 'string' && value != null) throw new Error(`${label} must be text.`);
  const text = (value ?? '').trim();
  if (text.length > max) throw new Error(`${label} must be ${max} characters or fewer.`);
  if (!text && !fallback) throw new Error(`${label} is required.`);
  return text || fallback;
}
export function makeSpark(input, id) {
  const author = textField(input.author, 'Name', 120, 'You');
  return { id, author,
    observation: textField(input.observation, 'Observation', 900),
    mayMatter: textField(input.mayMatter, 'Why it matters', 700, 'Still discovering why this matters.'),
    uncertainty: textField(input.uncertainty, 'Uncertainty', 700, 'This is unfinished. Questions and different perspectives are welcome.'),
    consent: 'Keep context and ask before taking it elsewhere.', credit: author };
}
