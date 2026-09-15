---
title: Shebam — Legal Position and Regulatory Strategy
description: Formal statement of Shebam's regulatory position as a self-hosted wallet, the invariants that keep it outside the MiCA licensing perimeter, and the conditions under which that position would change.
date: 2026-09-15
locale: en_US
author: Julien Béranger
model: Claude Opus 5
---

## 1. Status of this document

This document records the regulatory position of [Shebam](https://github.com/w3hc/shebam) and the strategy adopted to preserve it. It is an internal policy document intended to guide product decisions.

It is **not** legal advice. It builds on a preliminary opinion from counsel who expressly qualified that opinion as "neither a formal consultation nor an audit". A written opinion is to be obtained from a French lawyer specialising in [MiCA](https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng) and digital-asset regulation before any feature described in [section 6](#6-what-would-bring-shebam-into-the-regulated-perimeter) is implemented, and in particular on the single-signer [Safe](https://safe.global/) configuration described in [section 5](#5-the-three-invariants).

Where this document and the written opinion of counsel diverge, the opinion of counsel prevails.

## 2. Position statement

> **Shebam is a wallet, and only a wallet.**

Shebam is software that allows a user to move funds that already belong to that user. It does not hold client funds, does not hold or co-hold cryptographic keys, does not organise transactions, does not match counterparties, does not execute orders, and does not exercise discretion of any kind on behalf of a user.

Under [Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng) on markets in crypto-assets (MiCA), a person providing one or more crypto-asset services to third parties on a professional basis is a **crypto-asset service provider** (CASP) and requires authorisation. Shebam's position is that it provides **none** of the services enumerated by that regulation. It occupies the same position as [MetaMask](https://metamask.io/): a provider of self-hosted wallet software, outside the licensing perimeter.

This is the single organising principle of the project. Every product decision is subordinated to it.

## 3. The applicable framework

| Instrument                                                                                                                                                                                                                | Subject matter                                                                                                            | Applicability to Shebam today                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [MiCA — Regulation (EU) 2023/1114](https://eur-lex.europa.eu/eli/reg/2023/1114/oj/eng)                                                                                                                                    | Authorisation of crypto-asset service providers; issuance of e-money tokens                                               | Not applicable — no regulated service is performed                                                       |
| [TFR — Regulation (EU) 2023/1113](https://eur-lex.europa.eu/eli/reg/2023/1113/oj/eng)                                                                                                                                     | Information accompanying transfers of funds and crypto-assets ("travel rule")                                             | Addressed to CASPs; not applicable to self-hosted wallet software                                        |
| [AMLR — Regulation (EU) 2024/1624](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng)                                                                                                                                    | Anti-money-laundering single rulebook, applying from 10 July 2027, including restrictions on anonymity-enhancing features | Addressed to obliged entities; Shebam is not one, but the perimeter must be re-examined before that date |
| [DAC8 — Council Directive (EU) 2023/2226](https://taxation-customs.ec.europa.eu/taxation/tax-transparency-cooperation/administrative-co-operation-and-mutual-assistance/directive-administrative-cooperation-dac/dac8_en) | Automatic exchange of tax information on crypto-asset transactions, transposed from 1 January 2026                        | Addressed to reporting crypto-asset service providers; not applicable                                    |
| [Code monétaire et financier](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006072026/), Book V                                                                                                                | French implementation and criminal penalties for unauthorised provision of regulated services                             | Relevant as the sanction regime; see [section 7](#7-sanctions-exposure)                                  |
| [Directive (EU) 2015/849](https://eur-lex.europa.eu/eli/dir/2015/849/oj/eng) and [Article L561-12 CMF](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041577784)                                              | Five-year record retention on originator and beneficiary                                                                  | Addressed to obliged entities; not applicable                                                            |

The competent authorities for the French perimeter are the [Autorité des marchés financiers](https://www.amf-france.org/en) (AMF) and the [Autorité de contrôle prudentiel et de résolution](https://acpr.banque-france.fr/) (ACPR), with [ESMA](https://www.esma.europa.eu/) at Union level and [Tracfin](https://www.economie.gouv.fr/tracfin) as the financial intelligence unit.

## 4. Non-custody is not, by itself, the test

A widespread and incorrect belief holds that an application escapes regulation for as long as it does not hold user funds. This is false, and the error is material.

Custody is determinative for **one** service only: the custody and administration of crypto-assets on behalf of clients. For the other regulated services — operation of a trading platform, exchange of crypto-assets for funds, reception and transmission of orders, execution of orders on behalf of clients — the fact that the provider never touches the funds is **irrelevant**. Those services are defined by the act of intermediation, not by the holding of assets.

What therefore protects Shebam is not the non-custodial architecture in itself. It is the **absence of any regulated act**. The non-custodial design is a necessary condition, not a sufficient one.

## 5. The three invariants

Shebam remains outside the regulated perimeter for as long as, and only for as long as, all three of the following conditions hold simultaneously.

### 5.1 The user holds exclusive control of the wallet

Each user's [Safe](https://docs.safe.global/) is configured with that user **as sole signer**. Shebam does not co-sign, does not hold a key, does not hold a share of a key, and cannot influence, delay, censor or reverse any transaction. Authentication is performed locally on the user's device through [passkeys](https://fidoalliance.org/passkeys/) under the [WebAuthn](https://www.w3.org/TR/webauthn-2/) standard, by way of the [w3pk](https://github.com/w3hc/w3pk) library; the signing material never leaves the user's control.

Any relayer, sponsorship or session-key mechanism must be constructed so that it can only broadcast what the user has already authorised, and can never originate or alter an instruction.

### 5.2 No on-ramp or off-ramp inside the application

Conversion between euro and [EURe](https://www.gnosis.io/blog/eure-on-gnosis-chain) takes place with [Monerium](https://monerium.com/), an authorised electronic money institution, **outside** Shebam. Monerium bears the KYC, AML and e-money obligations attaching to the issuance and redemption of the token. Shebam must not accept fiat, must not remit fiat, and must not act as agent or distributor in that conversion.

Integrating Monerium's own flows is acceptable only where the contractual and technical relationship leaves the regulated act entirely with Monerium.

### 5.3 No matching mechanism

Shebam does not bring together buying and selling interests, does not put a buyer in contact with a seller, does not maintain an order book, and does not cause transactions between users to come into existence. It transfers what the user already owns to a destination the user alone designates.

A merchant _receiving_ EURe in payment is an ordinary transfer and does not affect this analysis.

### Consequence for privacy

Because Shebam is not an obliged entity, it is under **no obligation to retain transaction history**. This is not a technical preference but the direct consequence of the perimeter: the five-year retention duty under [Article L561-12 CMF](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041577784) and the corresponding provisions of [Article R561-11](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036824665) are addressed to obliged entities. The record-keeping burden rests entirely with Monerium.

It follows that confidential transfers are lawful at this stage. This is the legal foundation on which the shielded-transfer workstream described in the [technical roadmap](ROADMAP.md) rests.

## 6. What would bring Shebam into the regulated perimeter

The trigger is **matching**: bringing together offers to buy and sell EURe against euro, and causing transactions between users to arise. That act of intermediation corresponds to several services regulated by MiCA — operation of a trading platform, exchange, reception and transmission of orders, execution of orders — and, as set out in [section 4](#4-non-custody-is-not-by-itself-the-test), **none of them requires holding the funds**.

Two consequences follow immediately and simultaneously.

**Authorisation becomes mandatory.** Either Shebam obtains its own authorisation, or an authorised partner must **legally bear the matching activity itself**. The mere existence of a partner alongside Shebam is insufficient; the regulated act must be performed by the authorised entity.

**Strong privacy becomes unavailable.** Three regimes converge to prohibit it: five-year retention of counterparty identity, the [AMLR](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng) restrictions on anonymity-enhancing features applying from July 2027, and [DAC8](https://taxation-customs.ec.europa.eu/taxation/tax-transparency-cooperation/administrative-co-operation-and-mutual-assistance/directive-administrative-cooperation-dac/dac8_en) tax reporting, already in force.

Consequently, matching and strong privacy are **mutually exclusive**, and matching must not be attempted before a written opinion and, where required, an authorised partner are in place.

### 6.1 Privacy features specifically

The wallet exemption is cleaner for plain transfers than for privacy features. The prosecution of Alexey Pertsev in relation to [Tornado Cash](https://en.wikipedia.org/wiki/Tornado_Cash) rested substantially on the operation of the front end and supporting infrastructure rather than on custody. The practical line to hold is therefore:

- Shebam remains a **signing interface** to infrastructure operated by others — the protocol deployment, the association-set provider, the relayers;
- Shebam does **not** operate an association-set provider, does **not** operate relayers, does **not** take a fee on private transfers, and does **not** custody anything.

Each of those four acts moves Shebam from _user of a privacy protocol_ towards _operator of a privacy service_, which is a materially weaker position.

A further constraint is specific to the asset: EURe is a regulated **e-money token** under MiCA, and the issuer retains administrative controls over the contract. Monerium's compliance position must be obtained before any EURe is routed through a shielded pool.

## 7. Sanctions exposure

Deploying a regulated feature without prior authorisation exposes both **Shebam and its officers** to criminal liability. Under the penal provisions of the [Code monétaire et financier](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072026/LEGISCTA000006154712/) applicable to the unauthorised provision of regulated services, the exposure is in the order of **two years' imprisonment and a fine of €30,000**, alongside administrative sanctions and the prohibition of the activity.

This is the reason the order of operations set out in the [technical roadmap](ROADMAP.md) is binding rather than indicative.

## 8. The standing test for new features

Every feature added **on top of** plain transfer must be submitted to a single question before implementation:

> **Does Shebam here perform a regulated act, or does it merely provide a tool with which the user moves what already belongs to them?**

Features that must be re-examined against that test when they are proposed include, without limitation: server-side storage of transaction history, conversion of EURe into anything else, automatic settlement for merchants, centralised collection of funds, cashback or loyalty schemes, fee-taking on transfers, and any form of custody however temporary.

For as long as the answer remains "a tool for transfer", Shebam is within the safe zone.

## 9. Summary

|                           | Wallet phase                                    | Matching phase                                 |
| ------------------------- | ----------------------------------------------- | ---------------------------------------------- |
| **What Shebam does**      | Provides a tool to transfer the user's own EURe | Brings buyers and sellers together             |
| **Status**                | Unregulated, as MetaMask                        | Regulated service under MiCA                   |
| **Authorised partner**    | Not required                                    | Indispensable, and must bear the regulated act |
| **Transaction retention** | No obligation                                   | Mandatory, five years                          |
| **Strong privacy**        | Lawful                                          | Impossible                                     |

## 10. Review

This position is to be reviewed:

- before any feature listed in [section 8](#8-the-standing-test-for-new-features) is implemented;
- before any shielded-transfer functionality is shipped, together with Monerium's written compliance position;
- in any event before 10 July 2027, the date from which the [AMLR](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng) applies;
- immediately prior to any work on matching, in a scoping meeting with counsel held once the operational model is settled, with the object of obtaining a **written** opinion covering in particular the single-signer Safe configuration.

## Further reading

- [MiCA — Regulation (EU) 2023/1114, consolidated text](https://eur-lex.europa.eu/eli/reg/2023/1114/2024-01-09/eng)
- [EUR-Lex summary of the European crypto-assets regulation](https://eur-lex.europa.eu/EN/legal-content/summary/european-crypto-assets-regulation-mica.html)
- [AMLR — Regulation (EU) 2024/1624](https://eur-lex.europa.eu/eli/reg/2024/1624/oj/eng)
- [AMLAR — Regulation (EU) 2024/1620 establishing the Anti-Money Laundering Authority](https://eur-lex.europa.eu/eli/reg/2024/1620/oj/eng)
- [DAC8 — European Commission overview](https://taxation-customs.ec.europa.eu/taxation/tax-transparency-cooperation/administrative-co-operation-and-mutual-assistance/directive-administrative-cooperation-dac/dac8_en)
- [OECD Crypto-Asset Reporting Framework](https://www.oecd.org/en/topics/sub-issues/crypto-asset-reporting-framework-and-amendments-to-the-common-reporting-standard.html)
- [Autorité des marchés financiers — English site](https://www.amf-france.org/en)
- [European Central Bank — digital euro and privacy](https://www.ecb.europa.eu/euro/digital_euro/html/index.en.html)
- [Privacy Pools — Buterin, Illum, Nadler, Schär, Soleimani](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4563364)
- [Monerium — regulatory disclosures](https://monerium.com/)
- [Shebam technical roadmap](ROADMAP.md)
