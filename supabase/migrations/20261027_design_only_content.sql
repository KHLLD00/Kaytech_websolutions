-- Reposition Kaytech as a website design service (design only, no development).
-- Each update matches the previously seeded default text, so anything you have
-- already edited in the admin CMS is left untouched.

update public.site_content set value = 'WEBSITE DESIGN'
where section = 'hero' and content_key = 'eyebrow' and value = 'WEB DESIGN & DEVELOPMENT';

update public.site_content
set value = 'We design modern, high-performing websites that help businesses look credible, connect with their audience, and grow online.'
where section = 'hero' and content_key = 'description'
  and value = 'We design and build modern, high-performing websites that help businesses look credible, connect with their audience, and grow online.';

update public.site_content set value = 'Website design from idea to launch.'
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
    included_items = '["Product listings and detail pages","Cart and checkout design","Optional payment integration"]'::jsonb
where title = 'E-commerce'
  and short_description = 'Online stores designed to present products clearly and support purchasing.';

update public.services
set title = 'Custom Website Design',
    short_description = 'Bespoke design and user experience for requirements outside standard website packages.',
    description = 'Bespoke design and user experience for requirements outside standard website packages.',
    included_items = '["Custom layouts scoped to your requirements","Tailored user journeys and page structures","Design support for evolving needs"]'::jsonb
where title = 'Custom Web Solutions';
