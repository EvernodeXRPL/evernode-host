# Evernode setup for Hosts

[Evernode](https://evernode.wordpress.com/) enables Hot Pocket smart contracts to be hosted on a global network of decentralized hosts through [XRP Ledger](https://xrpl.org/).

- Anyone can become an **Evernode host** by installing the Evernode setup on their compatible Linux server.
- Hosts register on the **Evernode registry**, a well-known XRPL account published by Evernode foundation.
- Hosts lease smart contract hosting to **Evernode tenants** in exchange for **Evers (EVR)**.

_All of the above are automated by [Sashimono](sashimono.md), Evernode host management software which gets installed when you run the [Evernode installer](#installation)._

# Evernode beta

We are inviting interested enthusiasts to register as an Evernode host. As an Evernode beta host, your Linux server will be registered on the [XRPL Hooks v3 testnet](https://hooks-testnet-v3.xrpl-labs.com/). During the installation, you can choose how much system resources you wish to allocate for smart contract hosting. After everything is setup, your server will start leasing hosting space to Evernode tenants.

> **Testnet warning:** Since Evernode beta uses [XRPL Hooks v3 testnet](https://hooks-testnet-v3.xrpl-labs.com/), it is subjected to any changes/downtime imposed by the hooks testnet.

## Evernode beta licence

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the software for, or in connection, with the Evernode network for the duration of the beta test.

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS IN BETA AND PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Airdrops

Evernode Foundation may, in its absolute discretion, airdrop a portion of its Evers to people who participate in the beta. But the details of any such airdrop are not confirmed. The Foundation reserve the right to, at anytime and without notice, amend the details of any airdrop, include or exclude people or classes of people, or abandon the airdrop entirely. You should participate in the beta because you want to help the Evernode Network succeed, not because you want an airdrop of Evers.

# Installation

## System requirements

To intsall Evernode, you server must meet following requirements:

- Operating system: **Ubuntu 20.04** 64 bit (M1/ARM CPUs not supported. Any other Ubuntu versions are not supported.)
- RAM: **2 GB** minimum
- Swap: **2 GB** minimum
- Disk space: **4 GB** minimum free disk space for `/home`
- Domain name for your host ([read more](#domain-name))
- Email address for others to contact/report issues on your host
- Existing XRPL account with an EVR balance greater than 5120 (use [this page](https://dashboard.evernode.org/#/testnet-faucet) to generate a testnet account with EVR balance).

## Important tips

#### Hosting options

You can use a phyisical or virtual (VPS) Linux server as your Evernode host. **[WSL](https://docs.microsoft.com/en-us/windows/wsl/about) or [Containers](https://linuxcontainers.org/) are not supported**. It's recommended that you use a server which DOES NOT contain other workloads important to you. It's best if you can provision a fresh VPS from a cloud provider which you can dedicate for Evernode beta and dispose of easily when no longer required.

#### Domain name

You must posses a domain name (eg. `myhost.myhosting.com`) which is used to reach your host. This is required for proper SSL support for communicating with smart contracts hosted in your host. Evernode uses [Let's Encrypt](https://letsencrypt.org/) for automatic free SSL setup for your domain name. Domain names which map to multiple IP addresses (round-robin DNS) should not be used.

#### Email address
You must provide an email address during the installation of your host. The email address will be published on your host registration entry on the Hook which makes it **publicly visible to anyone**. It is put on display at the [dashboard](https://dashboard.evernode.org/) page for your host. There are two purposes of this email address:
  - It is is intended to be used as a public contact email for your host so that the general public can inquire or report issues about your host.
  - If you opt-in for [Let's Encrypt](https://letsencrypt.org/) automatic free SSL setup during the installation, this email is used for your host's SSL certificate registration with Let'sEncrypt. Let'sEncrypt will send email notifications about automatic SSL renewals periodically.

#### Network usage costs

Based on the smart contracts that are hosted on your server, you server will accumulate network usage while its operating. During the beta, we predict that this will be well within the basic data transfer allowances of most cloud VPS providers (less than 500 GB per month). However, we recommend you to monitor the network usage or set upper limits to avoid unpredictable costs.

#### Firewalls and ports

Evernode software itself does not require any ports to be opened. However SSL setup and hosted smart contracts requires following conditions to be met. Please note that Evernode automatically adds the required allow-rules for these ports to the operating system firewall. But if your host is behind an external firewall, you need to allow incoming TCP traffic to them yourself.

- The smart contracts that are getting hosted on your host require certain ports to be opened and incoming traffic be allowed. There are two port ranges which by default starts at 26201 and 22861. If your host supports `n` contract instances, the port ranges to allow would be `26201 to 26201+n` and `22861 to 22861+n`.
- Evernode's automatic SSL setup requires port 80 to be free and incoming traffic be allowed to it. Without this, the initial SSL setup and subsequent SSL renewals will fail. (If you are running a web server like Apache or nginx on the same host, they will cause SSL setup to fail. You can stop them or either configure them to not to use port 80 to overcome this problem.)

## Installation steps

Make sure you read the information above before installing. Run the following command to install Evernode beta on your Linux server. You need root (sudo) access for this.

```
curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s install
```

## Maintaining your host

Once Evernode is installed, you don't need to do anything else. Evernode will automatically use your server to fullfil leasing requests from Evernode tenants. You will earn Evers (EVR) as tenants lease hosting.

For monitoring and maintenance, you can use [Evernode CLI](evernode-cli.md).

At any time, you can uninstall and deregister from Evernode with `sudo evernode uninstall`.

Read about [Sashimono](sashimono.md) to get a better understanding on what's going on inside the software.

## Easy Evernode transfers

You can now perform Evernode transfers **without** installing `Evernode`.
You can use the following command in your terminal to execute an Evernode transfer for your host account.

```
curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s transfer -i
```

# Reporting issues

Please report any issues and error logs [here](https://github.com/HotPocketDev/evernode-host/issues).

# Global hosts dashboard

We maintain a dashboard containing all registered Evernode hosts. You can access it at [dashboard.evernode.org](https://dashboard.evernode.org/).
