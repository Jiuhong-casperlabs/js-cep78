### Install cep78-contract  (deployer: user 1, holder_mode = 0)
```
npm run installcep78
```

"contract-hash"

"hash-65053b7ee7602a9c4feb171396fcaf0315eef38b321e79bcb0bd92b7cf001631"


"packagehash"

"hash-986bca3c01696859ac13db896a4bec41b35d9e4ac3d6a94ac5648b3e9f5dfe68"


### Install minting_contract
```
npm run installminting
```

"contract-hash"

"hash-99d69094de50f91495b25857bbf43b2488871be224fdc4c0893680620863bf97"

"packagehash"

"hash-c2b011c47c761d1c794ae784b5cf508d17a638316f453b05ac096ff7203e8f74"


### mint 
```
npm run mint2
```
=> User error: 81


### set variables (set contract_whitelist to contain minting contract )
```
npm run setvars
```
=> ok

### mint again
```
npm run mint2
```

=> ok