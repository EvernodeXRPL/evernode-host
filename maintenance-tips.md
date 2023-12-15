# Maintenance Tips

## Evernode Transfer

If a host needs to transfer existing registration to another XRPL account or to the same host account, we do the transfer. This is useful in many scenarios.

ex:- Due to host machine upgrade.

After the transfer is completed, it needs to do an evernode re-install.(This re-installation won't cost the regular host registration fee. It will be a 1Now(1*10<sup>-8</sup> EVRs)).

- If `Evernode` is already **installed**, you can use below to transfer the registration NFT.

 ```
 evernode transfer
 ```

- If `Evernode` is **not installed**, you can now perform Evernode transfers too. you can use the following command in your terminal to execute an Evernode transfer for your host account.

 ```
 curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s transfer -i
 ```