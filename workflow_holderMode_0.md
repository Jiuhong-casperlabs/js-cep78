### Install cep78-contract  (deployer: user 1, holder_mode = 0)
```
npm run installcep78
```

"contract-hash"

"hash-9c49de9de33d424de344bd044c85d0a8ffcabb50534a9518c05dc2344e090aa5"


"packagehash"

"hash-13d743f747c4cb20252ead46e4e6aa9fb95e97fd2d8d72e50a9ea01dabfb70dd"



### Mint (deployer: user 1, owner: user 2)
```
npm run mint
```

### Transfer (deployer: user 1, source: user 2)
```
npm run transfer
```

=>  "User error: 1" => InvalidAccount

 ### Transfer (deployer: user 2, source: user 2, target: user 3)
```
npm run transfer
```

=> ok


 ### Approve(deployer: user 3, operator: user 1)
 ```
 npm run approve
 ```
 => ok

 ### Transfer (deployer: user 1, source: user 3, target: user 4)
 ```
 npm run transfer
 ```
=> ok

