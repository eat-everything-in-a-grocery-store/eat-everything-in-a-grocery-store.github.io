import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { Faq } from "@/components/site/faq";
import { PageSections } from "@/components/site/page-sections";
import { SiteFooter } from "@/components/site/site-footer";
import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { siteConfig } from "@/config/site";
import { visibleCorePages, enabledLegalPages } from "@/content/registry";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";
import type { HomePageDefinition } from "@/config/types";

export function FixedTemplateHome({home}:{home:HomePageDefinition}) {
 const nav=visibleCorePages.map(p=>({label:p.navLabel,slug:p.slug}));
 const legal=enabledLegalPages.map(p=>({label:p.navLabel,slug:p.slug}));
 return <><JsonLd data={homeSchemas(home)}/><main>
 <section className="hero"><div className="wrap">
 <div className="hero-grid"><div><p className="kicker">{home.hero.eyebrow}</p><h1>{home.hero.heading}</h1><p>{home.hero.lead}</p><p>{home.hero.supportingText}</p>
 <div className="mt-5 flex flex-wrap gap-3"><a className="button-primary" href={siteConfig.game.officialUrl||"#"} target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a>{home.hero.primaryLink?<Link className="button-secondary" href={routePath(home.hero.primaryLink.slug)}>{home.hero.primaryLink.label}</Link>:null}</div>
 <p className="mt-4 text-sm">Official developer: {siteConfig.game.developer} · Place ID: 128201586883489 · Fact check: 18 Oct 2026</p>
 </div><div className="cover"><img className="w-full rounded" src={assetPath(siteConfig.assets.cover)} alt="Eat Everything In A Grocery Store guide cover illustration" /></div></div>
 <div className="quick">{nav.map(p=><div key={p.slug}><Link href={routePath(p.slug)}>{p.label} →</Link></div>)}<div><a href={siteConfig.game.officialUrl||"#"} rel="noopener noreferrer">Official Roblox game ↗</a></div></div>
 </div></section>
 <div className="wrap content-grid"><article className="article"><PageSections sections={home.sections}/><Faq items={home.faq}/></article>
 <aside className="side"><h2>At a glance</h2><dl><dt>Developer</dt><dd>{siteConfig.game.developer}</dd><dt>Game goal</dt><dd>Empty the store</dd><dt>Advertised calories</dt><dd>4,300,000</dd><dt>Food Index target</dt><dd>175</dd><dt>Gym tracks</dt><dd>5</dd><dt>Platform</dt><dd>Roblox</dd></dl>
 <h3 className="mt-6">Explore guides</h3><nav aria-label="Guide shortcuts"><ul>{nav.map(p=><li key={p.slug}><Link href={routePath(p.slug)}>{p.label} →</Link></li>)}</ul></nav></aside></div>
 <div className="site-container"><NativeAdSlot/></div>
 </main><SiteFooter coreLinks={nav} legalLinks={legal}/></>;
}
