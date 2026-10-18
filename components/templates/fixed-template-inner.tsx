import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { PageSections } from "@/components/site/page-sections";
import { Faq } from "@/components/site/faq";
import { RelatedPages } from "@/components/site/related-pages";
import { SiteFooter } from "@/components/site/site-footer";
import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { FoodIndexTracker } from "@/components/site/food-index-tracker";
import { ClearRunPlanner } from "@/components/site/clear-run-planner";
import { enabledLegalPages, getRelatedPages, visibleCorePages } from "@/content/registry";
import { pageSchemas } from "@/lib/schema";
import type { SeoPageDefinition } from "@/config/types";
export function FixedTemplateInner({page}:{page:SeoPageDefinition}){
 const nav=visibleCorePages.map(p=>({label:p.navLabel,slug:p.slug}));
 const legal=enabledLegalPages.map(p=>({label:p.navLabel,slug:p.slug}));
 return <><JsonLd data={pageSchemas(page)}/>
 <main className="template-inner-main"><nav className="site-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> › {page.navLabel}</nav>
 <article className="template-inner-article"><p className="kicker">{page.hero.eyebrow}</p><h1>{page.hero.heading}</h1><p className="lead">{page.hero.lead}</p>
 {page.slug==="food-index"?<FoodIndexTracker/>:null}
 {page.slug==="fast-clear-guide"?<ClearRunPlanner/>:null}
 <PageSections sections={page.sections}/>
 {page.faq?.length?<Faq items={page.faq}/>:null}
 <RelatedPages pages={getRelatedPages(page)}/>
 <p className="mt-8 text-sm">Facts checked against the official Roblox description: <time dateTime={page.lastReviewed}>{page.lastReviewed}</time>. Strategies without gameplay evidence are identified as suggestions. <a href="https://www.roblox.com/games/128201586883489/Eat-Everything-In-A-Grocery-Store" rel="noopener noreferrer">Official game source ↗</a></p>
 </article></main>
 <div className="site-container"><NativeAdSlot/></div>
 <SiteFooter coreLinks={nav} legalLinks={legal}/></>;
}
