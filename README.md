# DAO Ambassador

## Project summary

DAO Ambassador is a solution for the digital representation of DAOs. It allows DAOs to issue digital proxies to their members in the form of soulbound tokens (SBTs) and present them to third parties to prove their roles, powers granted, and contributions.

This project was developed for the BUIDL IT web3 hackathon https://buidlit.polygon.technology/.

Backend: https://github.com/identix-space/dao-ambassador-backend
Contracts: https://github.com/identix-space/dao-ambassador-contracts

## Roles and user stories

### DAO as proxy issuer

![image036a3b177167c372.png](https://im.wampi.ru/2022/08/22/image036a3b177167c372.png)

### Representative

![image5072e8110699d695.png](https://ie.wampi.ru/2022/08/22/image5072e8110699d695.png)

### Verifier

![image230d6c834189594f.png](https://ie.wampi.ru/2022/08/22/image230d6c834189594f.png)


## How to build

### Get started
- `git clone ...`
- `npm install`
-  `cp .env_example .env`
- Edit `.env`
- `npm run gen`
- `npm run dev`

Production build:
- `npm run build`
- `npm start`

### Types generation
Run `npm run gen` after every GraphQL API Schema changed or after `./graphql/*.graphql` files are modified

### Other info
Build info page available at `/_info`: http://localhost:3000/_info
