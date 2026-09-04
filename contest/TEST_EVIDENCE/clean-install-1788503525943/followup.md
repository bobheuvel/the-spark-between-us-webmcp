# Clean-check follow-up

Fresh git archive source: 3ab4dfe60f14310a57468945216ff2e0c52ed38c, under .qa-clean/run-aSlPSq/source.

The original result.json/install.txt deliberately retain the failed offline installation: a required tarball was absent from the package cache. A sandboxed online retry encountered access restrictions and was interrupted. The identical frozen-lockfile install was then retried with approved elevated dependency access and completed successfully: pnpm 11.19.0, 547 packages, exit 0 (terminal session 5841). Production build in that clean source also completed exit 0 (session 48206). Successful output is retained in the task tool history, not in the initial failed install.txt.

This proves clean install/build at 3ab4dfe, not a clean install of every later CSS/typing/accessibility change. Package and lockfile remained unchanged; final source was separately tested, typechecked, linted and built in timestamped release evidence.
