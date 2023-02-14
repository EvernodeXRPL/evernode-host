# Sashimono

Sashimono is Evernode's host management software. It enables your host to participate in the Evernode network so that Tenants can lease smart contract hosting resources from your host. It performs following jobs:
1. Interacts with XRPL for Evernode transactional activities.
2. Provisions HotPocket smart contract instances using host's hardware resources.
3. Manages SSL certificates if you have opted-in for Let's Encrypt SSL integration.

## XRPL interaction
Evernode uses XRPL transactions for host registration management and smart contract leasing operations. Due to this, Sashimono needs a continous websocket connection to a Rippled server of your choice. This is an outgoing connection and usually does not need any special permissions with firewalls. Sashimono uses this connection to submit and listen to Evernode operations (which are simply XRPL transactions) on behalf of your Host's XRPL account.

1. Every Moment (currently defined as 1 hour), Sashimono announces to Evernode Registry hook that your host is online. This is performed via the Evernode "Heartbeat" transaction. If your host fails to report the heartbeat for 1 Moment, it will be shown as "inactive" on the [Evernode dashboard](https://dashboard.evernode.org). Continously being "inactive" will make your host's registration susceptible for prunning.

2. If Sashimono receives a smart contract hosting lease payment (Evernode "Acquire Lease" transaction) from a potential tenant, based on the availabilty of vacant system resources, it will then provision a HotPocket smart contract instance and provide the instance connection details back to the tenant.
   - It is worth noting that the smart contract instance runs completely independently of Sashimono or XRPL. Sashimono simply manages the life-cycle of the smart contract instance according to the lease duration and purges it upon lease expiration.
   - A tenant could pay to extend the duration of an existing lease (Evernode "Extend Lease" transaction).

3. You could update your host information on the Evernode registry using the `evernode` CLI tool. This will cause the updated host information to get displayed on the [Evernode dashboard](https://dashboard.evernode.org).

## Provisioning of HotPocket smart contracts
Sashimono only manages the resource allocation and destruction of HotPocket smart contract instance requested by tenants. Other than that, the smart contracts run independently of Sashimono (and of each other). They also make use of independent websocket channels to communicate with their clients.

1. Sashimono runs HotPocket smart contracts as rootless Docker containers. This enables smart contract instances to be isolated from the host and also from each other. Read more on smart cotnract container architecture [here](http://blog.geveo.com/Sashimono-Designing-a-multi-tenant-dApp-hosting-platform).
2. Each contract instance gets allocated a Linux user account (named with 'sashi' prefix), 2 TCP ports, and hardware resource quotas for CPU, Disk and Memory. Use `evernode list` command to get instance information.
3. All data relating to a contract instance is kept within the instance user's home directory.
4. Each instance uses the 2 TCP ports that Sashimono assigns for **websocket** communication.
   - Peer port is used to communicate with other instances of the same contract cluster. These other instances would most probably be hosted on other hosts.
   - User port is used by the contract's users to communicate with the contract.
   - Both ports must support incoming connections, hence they should be allowed through any firewalls you may have (Sashimono automatically manages the operating system default firewall for you).
5. Upon lease expiry, Sashimono deletes all data and resources allocated to the corresponding smart contract instance.

## Let's Encrypt SSL
During the installation, if you opted in to use [Let's Encyrypt](https://letsencrypt.org/) SSL certificates, Sashimono would integrate with Let's Encrypt [cerbot](https://certbot.eff.org/pages/about) software to acquire and renew SSL certificates for your host's domain. This is fully automated and you do not have to do anything. Following explanation is for informational purposes only.

1. Upon installation, new SSL certificates issued from Let's Encrypt are acquired for your domain using certbot. Certbot places them in `/etc/letsencrypt/live/<your domain>` directory.
2. HotPocket smart contract instances uses these SSL ceriticates on its websocket channels so they could communicate with wide range of clients including web browsers.
2. Let's Encrypt SSL certificates expire every 3 months. Certificate renewals are automatically handled.
3. When SSL certificates are auto-renewed, all existing contracts will be updated with new SSL certificates. This will cause all existing contract instances to be stopped and started for a brief period (few seconds). This is performed with a script placed in `/etc/letsencrypt/renewal-hooks/deploy/` directory.
