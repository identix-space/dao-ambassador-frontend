# DAO Ambassador

## Project summary

DAO Ambassador is a solution for the digital representation of DAOs. It allows DAOs to issue digital proxies to their members in the form of soulbound tokens (SBTs) and present them to third parties to prove their roles, powers granted, and contributions.

This project was developed for the BUIDL IT web3 hackathon https://buidlit.polygon.technology/.

More info: [DEVPOST_LINK]()

## Roles and user stories

### DAO as proxy issuer

![DIAGRAMMA-BEZ-NAZVANIY-4.md.png](https://im.wampi.ru/2022/08/22/DIAGRAMMA-BEZ-NAZVANIY-4.md.png)

### Representatve

![image891b9cda2dcaf75d.md.png](https://im.wampi.ru/2022/08/22/image891b9cda2dcaf75d.md.png)

### Verifier

![imaged75a80fe27ffcc7d.md.png](https://im.wampi.ru/2022/08/22/imaged75a80fe27ffcc7d.md.png)


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
