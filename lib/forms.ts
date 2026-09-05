/**
 * Web3Forms hozzáférési kulcs – ugyanaz a megoldás, ami a lelkekgyogyasza.hu és a
 * budapest-dietetikus.hu oldalon is fut. Ott a kulcs be van írva a forráskódba,
 * itt is lehet így: a Web3Forms kulcsa nem titok, minden statikus oldalon látszik
 * a HTML-ben. Csak azt dönti el, melyik postaládába érkezzen a levél.
 *
 * ⚠️ ÍRD IDE A KULCSOT, és ezzel él a feliratkozás:
 *     export const WEB3FORMS_KEY = "a1b2c3d4-....";
 *
 * A kulcsot a web3forms.com oldalon lehet kikérni a csanad.peter.czarth@gmail.com
 * címre; pillanatokon belül megérkezik levélben.
 *
 * Ha inkább környezeti változóban tartanád, a WEB3FORMS_ACCESS_KEY felülírja ezt.
 */
const HARDCODED_KEY = "";

export function web3formsKey(): string | null {
  return process.env.WEB3FORMS_ACCESS_KEY || HARDCODED_KEY || null;
}
