# Governance Game

## Hooks

There are three Hooks.

- Registry – Handles host registrations, issuing registration tokens.
- Heartbeat – Handles heartbeats and rewards.
- Governance – Handles governance game.

The account associated with each hook remains constant, while the hooks themselves can be modified according to these rules.

## Participants

There are two classes of participants in the Governance Game.

- The Foundation: The Foundation always has 1 vote and has special rights in Piloted and Co-Piloted modes and has no special rights over Auto-Piloted mode.
- Valid Hosts: Accounts that hold a registration token for the previous 3 continuous months and are not eligible to be pruned due to unreliability.

## Governance

The Participant can submit a Proposal with new Hook hashes of above mentioned 3 Hooks. Once that Proposal is continuously supported by 80% of eligible Participants for 2 weeks, the existing hooks will be replaced by the proposed hooks.

### Submitting a proposal

- A Proposal represents the hashes <governance_hooks_hash><registry_hook_hash><heartbeat_hook_hash> of the new Hook to replace an existing Hook.
- Any Participant can submit a Proposal for a new Hook.
- Proposer must collateralize their Proposal with 1 Moment’s worth of EVR rewards.
- The hooks which bear the proposed hashes must be deployed to some existing XRPL account.

### Withdrawing a Proposal

- The Proposer can withdraw their Proposal at any time before it Succeeds or Purges.
- If the Proposal is withdrawn, the proposer gets half their EVRs back.
- Lost EVRs are added to that Epoch’s reward pool.

### Purging a Proposal

- If a Proposal has not Succeeded three months after being proposed, it will be purged. If a Proposal expires, the Proposer loses all their staked EVRs.
- Lost EVRs are added to that Epoch’s reward pool.

### Voting

- Hosts can make their choice of voting via Evernode-Cli.
- Participant's vote is captured via their heartbeat, which is managed by Evernode software installed on the host.
- They either Support or Reject a Proposal.
  - Reject is the default.
  - Support is a positive vote for the Proposal.

### Electing a Proposal

- A Proposal succeeds if it is continuously Supported by at least 80% of possible Participants for 2 weeks.
- If a Proposal succeeds all other existing Proposals for that Hook are Purged and their staked EVRs are added to the Epoch’s reward pool.
- The Proposer of the successful proposal gets all their staked EVRs back.

### The Foundation Special Rights

- These rules apply when determining the Foundation vote.

  - Always Eligible: Foundation is always eligible to vote.
  - Fall-Back Option: If there are no other eligible Participants, the Foundation vote is determinative.

- In addition, the Foundation vote carries special weight depending upon the status of the game.
- The Governance Game has three statuses.

  - Piloted: The Foundation vote determines the outcome of all Proposals.
  - Co-Piloted: No Proposal can succeed unless the Foundation Supports it and it fails if the Foundation opposes it.
  - Auto-Piloted: The standard voting rules apply with the Foundation being treated equally with any other Participant.

- The game begins Piloted and becomes Co-Piloted at the election of the Foundation.
- If it is Co-Piloted, it becomes Auto-Piloted at the election of the Foundation.
- If the game is Auto-Piloted, Participants can vote under standard rules to return the game to Piloted or Co-Piloted Status.
