# Evernode
[Evernode](https://evernode.wordpress.com/) enables Hot Pocket smart contract developers to host their contract clusters through [Hooks-enabled XRP Ledger](https://xrpl-hooks.readme.io/). Evernode uses a [hook](https://github.com/HotPocketDev/evernode-hook) to keep track of the hosting servers and contract hosting requests.

  - Hot Pocket contracts are hosted on Linux servers which are registered as **Evernode hosts**.
  - Anyone can become an Evernode host by installing the Evernode setup on their compatible Linux server.
  - Fair hosts will periodically earn EVR tokens as rewards.
  - Evernode performs periodic audits on registered hosts to ensure fair behaviour and dispatch the EVR rewards.
  - A host is considered fair based on their availability and the extent they meet the promised hosting specifications.

# Evernode beta
We are inviting interested enthusiasts to register as a host. As an Evernode beta host, your Linux server will be registered on the [XRPL hooks testnet](https://hooks-testnet.xrpl-labs.com/). You will receive EVR tokens on the **testnet** which DOES NOT have any real-world value. After registration, your server will automatically start accepting contract hosting requests from Evernode users. During the installation, you can choose how much system resources you wish to allocate to fullfil contract hosting requests.

## System requirements
To reduce our testing and development overhead, during the beta, we require your server to meet following minimum requirements:
  - Operating system: **Ubuntu 20.04 (64 bit)**
  - RAM: **2 GB** minimum
  - Disk space: **4 GB** minimum free disk space for /home

## Important tips
  - You can use a phyisical or virtual (VPS) server as your Evernode host.
  - It's recommended that you use a server which DOES NOT contain other workloads important to you. It's best if you can provision a fresh VPS from a cloud provider which you can dedicate for Evernode beta and dispose of easily when no longer required.
  - Based on the network activity of the Hot Pocket contracts that may be hosted on your server, you server will accumulate network usage while its operating. During the beta, we predict that this will be well within the basic data transfer allowances of most cloud VPS providers (eg. 500 - 1000 GB per month). However, we recommend you monitor the network usage or set upper limits to avoid unpredictable costs.

## Become an Evernode beta host
You can register on Evernode beta and become a host just by running the following setup on your Linux server.
```
curl -fsSL https://...storage url.../setup.sh | cat  | sudo bash -s install
```

## Maintaining your host
Once your host is registered, you don't need to do anything else. Evernode will automatically use your server to fullfil hosting reqeusts from Evernode users. You will keep earning EVR rewards on your host XRPL account as long as you keep your server online.

If you do want to monitor activity, you can use following commands:
  - `evernode status` - Display your current registration status and EVR token balance in your account.
  - `evernode list` - Display a list of Hot Pocket contracts running on your host.

At any time, you can uninstall and deregister from Evernode with `evernode uninstall`.