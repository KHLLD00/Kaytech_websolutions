-- Reposition Kaytech as a website design service (design only, no development).
-- Each update matches the previously seeded default text, so anything you have
-- already edited in the admin CMS is left untouched.

update public.site_content set value = 'WEBSITE DESIGN'
where section = 'hero' and content_key = 'eyebrow' and value = 'WEB DESIGN & DEVELOPMENT';

update public.site_content
set value = 'We design modern, high-performing websites that help businesses look credible, connect with their audience, and grow online.'
where section = 'hero' and content_key = 'description'
  and value = 'We design and build modern, high-performing websites that help businesses look credible, connect with their audience, and grow online.';

update public.site_content set value = 'Website design from first idea to finished design.'
where section = 'hero' and content_key = 'supporting_text'
  and value = 'From idea to launch — we handle the digital side.';

update public.services
set title = 'Website Design',
    short_description = 'Modern responsive website designs created around the client''s goals.',
    description = 'Modern responsive website designs created around the client''s goals.',
    included_items = '["Custom design suited to the business","Responsive across desktop, tablet and mobile","Clear visual hierarchy and consistent styling"]'::jsonb
where title = 'Website Design & Development';

update public.services
set short_description = 'Online store designs that present products clearly and support purchasing.',
    description = 'Online store designs that present products clearly and support purchasing.',
    included_items = '["Product listings and detail pages","Cart and checkout design","Clear product and category organization"]'::jsonb
where title = 'E-commerce'
  and short_description = 'Online stores designed to present products clearly and support purchasing.';

update public.services
set title = 'Custom Website Design',
    short_description = 'Bespoke design and user experience for requirements outside standard website packages.',
    description = 'Bespoke design and user experience for requirements outside standard website packages.',
    included_items = '["Custom layouts scoped to your requirements","Tailored user journeys and page structures","Design support for evolving needs"]'::jsonb
where title = 'Custom Web Solutions';

-- Pricing packages: drop development items (deployment, functionality, integrations, SEO setup).
update public.packages
set features = '["Up to 4 pages designed (Home, About, Services, Contact)","Desktop and mobile layouts","Clean layout built on a proven structure","Colours and fonts chosen for your brand","Contact info and social links","1 round of revisions","Design files handover"]'::jsonb
where name = 'Starter'
  and features = '["Professional website design","Responsive design","Core website pages","Business/contact information","Social links","Basic SEO foundation","Deployment"]'::jsonb;

update public.packages
set features = '["Everything in Starter","Up to 8 pages designed","Desktop, tablet and mobile layouts","Custom visual style that fits your brand","Colour, type and spacing guide","Contact/lead form design","Social sharing image design","2 rounds of revisions"]'::jsonb
where name = 'Business'
  and features = '["Everything in Starter","More pages/content","Enhanced design","Service/product presentation","Contact/lead forms","Open Graph/social sharing","Advanced SEO foundation","Additional functionality"]'::jsonb;

update public.packages
set description = 'For businesses requiring a more advanced or customized design.',
    features = '["Everything in Business","8+ pages, including complex layouts","Fully custom design direction with moodboard","Full style guide with reusable components","Tailored user journeys","Clickable prototype","3 rounds of revisions","Design files and a short walkthrough"]'::jsonb
where name = 'Professional'
  and features = '["Everything in Business","Advanced/custom functionality","Custom integrations where applicable","More complex page structures","Enhanced UX","Additional customization"]'::jsonb;

-- If you added the "Do you provide payment integration?" FAQ in the admin, edit or remove it there.
