# Evernode
[Evernode](https://evernode.wordpress.com/) enables Hot Pocket smart contract developers to host their contracts through [XRP Ledger](https://xrpl.org/).

  - Anyone can become an **Evernode host** by installing the Evernode setup on their compatible Linux server.
  - All hosts register on the **Evernode registry**, a well-known XRPL account published by Evernode foundation.
  - Hosts list **hosting tokens** on the XRPL decentralized exchange priced in **Evers (EVR)**.
  - External parties can purchase hosting tokens on the dex and **redeem** in favour of smart contract instances.

_All of the above are automated by **Sashimono**, Evernode host management software which gets installed when you run the Evernode setup._

# Evernode beta
We are inviting interested enthusiasts to register as an Evernode host. As an Evernode beta host, your Linux server will be registered on the [XRPL NFT devnet](wss://xls20-sandbox.rippletest.net:51233). During the installation, you can choose how much system resources you wish to allocate for smart contract hosting. After everything's setup, your server will automatically start accepting "redeem" requests from Evernode users.

> **Devnet warning:** Since Evernode beta uses **XRPL NFT Devnet**, Evernode registry and your registration may get wiped out without prior notice. In such cases we will have to spin up a new registry before you can reinstall Evernode and become part of our beta network again.

## System requirements
To reduce our testing and development overhead, during the beta, we require your server to meet following minimum requirements:
  - Operating system: **Ubuntu 20.04** (64 bit)
  - RAM: **2 GB** minimum
  - Swap: **2 GB** minimum
  - Disk space: **4 GB** minimum free disk space for `/home`

## Important tips
  - You can use a phyisical or virtual (VPS) server as your Evernode host.
  - It's recommended that you use a server which DOES NOT contain other workloads important to you. It's best if you can provision a fresh VPS from a cloud provider which you can dedicate for Evernode beta and dispose of easily when no longer required.
  - Based on the network activity of the smart contracts that may be hosted on your server, you server will accumulate network usage while its operating. During the early days of the beta, this will be very minimal (eg. less than 50 GB per month). Even as the beta network grows, we predict that this will be well within the basic data transfer allowances of most cloud VPS providers (eg. 500 - 1000 GB per month). However, we recommend you to monitor the network usage or set upper limits to avoid unpredictable costs.

## Running the setup
You can register on Evernode beta and become a host just by running the following command on your Linux server. You need root access for this.
```
curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta/setup.sh | cat  | sudo bash -s install
```

## Maintaining your host
Once Evernode is installed, you don't need to do anything else. Evernode will automatically use your server to fullfil hosting reqeusts from Evernode users. You will earn Evers (EVR) as users purchase your hosting tokens.

For monitoring and maintenance, you can use following commands:
  - `evernode status` - Display your current registration status and EVR token balance in your account.
  - `evernode list` - Display a list of smart contracts running on your host.
  - `evernode update` - Apply Evernode beta software updates.

At any time, you can uninstall and deregister from Evernode with `evernode uninstall`.