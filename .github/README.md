# Repository review configuration
The pull request template is ready for use once this folder is included in the shared repository baseline. It records business review as well as file checks.

Folder ownership remains deliberately unassigned. There is no active CODEOWNERS file and no claim of enforced remote review. After names and authorised GitHub handles are known, the administrator can adapt [the example](../00-control/templates/CODEOWNERS.example) into `.github/CODEOWNERS` and configure protection of `main`.

Janith is the merge coordinator. Confirm his authorised GitHub handle rather than guessing it from remote names. Protect the ownership file and shared controls as well as the business folders. Multiple owners on one CODEOWNERS rule do not require all of them to approve; record each required affected-person sign-off in the review.

See the [rollout checklist](../00-control/COLLABORATION-SETUP.md) for remote setup still to complete. Folder ownership and selected-folder views are not security permissions.
