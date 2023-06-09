# Maintenance Tips

## Evernode Transfer

If a host needs to transfer existing registration to another XRPL account or to the same host account, we do the transfer. This is useful in many scenarios.

ex:- Due to host machine upgrade.

Transfer can be done to the same host account or to a completely different host account.

After the transfer is completed, it needs to do a evernode re-install.(This re-installation won't cost a regular host registration fee. It will be a 1Now(EVRs * 10<sup>-8</sup>))

## Evernode transfer

You can use below to transfer the registration NFT **after installing** `Evernode`.

``` 
evernode transfer 
```

## Easy Evernode transfer

You can now perform Evernode transfers **without** installing `Evernode`.
You can use the following command in your terminal to execute an Evernode transfer for your host account.

```
curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s transfer -i
```