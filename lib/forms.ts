/**
 * Web3Forms – ugyanaz a megoldás, ami a lelkekgyogyasza.hu és a
 * budapest-dietetikus.hu oldalon is fut.
 *
 * FONTOS: az ingyenes csomag CSAK böngészőből engedi a hívást, szerverről 403-at
 * ad ("Use our API in client side ... Pro plan is required"). Ezért megy az
 * űrlap közvetlenül a kliensből, és ezért van a kulcs is itt, a forrásban –
 * a testvéroldalakon is így van, a Web3Forms kulcsa nem titok. Csak azt dönti
 * el, melyik postaládába érkezik a levél.
 *
 * A kulcs a web3forms.com oldalon kérhető ki; cserélni ezt az egy sort kell.
 */
export const WEB3FORMS_KEY = "4b7695ad-11b6-4ad0-a4fb-af3323920fe5";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
