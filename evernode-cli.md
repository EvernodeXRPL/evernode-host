# Evernode CLI

You can use the Evernode CLI to manage and monitor your Evernode host.

- `evernode status` - Display your current registration status and Ever balance in your account.
- `evernode list` - Display a list of smart contracts running on your host.
- `evernode log` - Generate Evernode log file. Requires sudo.
- `evernode transfer` - Initiates a transfer so you can move to a new host/account or reinstall on same host/account without having to pay the registration fee again.
- `evernode applyssl <private key file> <cert file> <ca bundle file (optional)>` - Apply your own SSL certificates for contracts. This is not needed if you opted-in for Let's Encrypt SSL during installation. Requires sudo.
    - `<private key file>`: Path to the tls private key file.
    - `<cert file>`: Path to the tls cert file (public key).
    - `<ca bundle file (optional)>`: Path to the tls certificate authority file. Optional.
- `evernode config <type> <arguments (optional)>` - View and update host configuration. Requires sudo.
    - `<type>` must be one of configuration types: `resources`, `leaseamt`, `rippled`.
    - If you don't specify any arguments, it will print the current configuration value.
    - `evernode config resources <ram> <swap> <disk> <Instance count>`: Configure hardware resource allocation for contracts.
        - `<ram>`: Total RAM to use for contracts in MegaBytes.
        - `<swap>`: Total Swap to use for contracts in MegaBytes.
        - `<disk>`: Total Disk space to use for contracts in MegaBytes.
        - `<instance count>`: Maximum number of contract instances that can be leased. Hardware resources will get evenly distributed between contract instances.
    - `evernode config leaseamt <lease amount>`
        - `<lease amount>`: Per Moment per contract lease amount to charge in Evers (EVR).
    - `evernode config rippled <server url>`
        - `<server url>`: Rippled server websocket url (wss://) you want to use to interact with XRPL.
    - `evernode config email <email address>`
        - `<email address>`: Contact email address for the host (this will be published on the host registry and is publicly visible to anyone).
- `evernode governance <operation_type> <arguments (optional)>` - Manages the governance candidates related to the host.
    - `<operation_type>` must be one of operation types: `propose`, `withdraw`, `vote`, `unvote`, `status`, `report` and `help`.
    - `propose`, `withdraw`, `vote`, `unvote` and `report` operations require sudo.
    - `withdraw`, `vote`, and `unvote` operations apply to both new hook and dud host candidate types. 
    - Use the `propose` operation to propose new hook candidates and the `report` operation to propose dud host candidates.
    - `evernode governance propose <hash file> <short name>` - Propose a new hook candidate.
      - `<hash file>` : Text file with the combined hashes of proposing hooks (`<governor_hook><registry_hook><heartbeat_hook>`).
    - `evernode governance withdraw <candidate id>` - Withdraw proposed governance candidate.
    - `evernode governance vote <candidate id>` - Vote for a governance candidate.
    - `evernode governance unvote <candidate id>` - Remove vote from voted governance candidate.
    - `evernode governance status` - Get governance information of the host.
      - This also helps to find proposed and voted `candidate_id`s by the host.
    - `evernode governance report <dud host address>` - Propose a dud host candidate using its XRPL account address. 
    - `evernode governance help` - Print the command information.

- `evernode delete <instance name>` - Remove an existing smart contract instance and cancels the lease. Any payments made for lost lease duration are not refunded.
    - `<instance name>` Name of the smart contract instance to be deleted. Use `evernode list` to find out instance name.
- `evernode update` - Apply Evernode beta software updates. You don't really need to use this as the auto-updater takes care of this. Requires sudo.
- `evernode uninstall` - Uninstall and deregister from Evernode. Requires sudo.
- `sashi` - Sashimono CLI for advanced operations and monitoring. Use `sashi -h` for help.