# Fervo Social - Codex Build Specification

Version: 1.1
Launch market: Brazil
Primary language: Brazilian Portuguese
Secondary languages: Spanish and English
Product type: Adult-only social discovery, events, clubs, and professional profiles
Domain: fervo.social

## 0. Product direction

Fervo Social must be substantially simpler than FabSwingers. The product should not reproduce separate pages for every small feature. The main experience is a hybrid vertical feed combining Reels-style media with normal social posts, text requests, availability posts, clubs, events, professionals, and sponsored content.

The interface should be usable by adults who are not highly technical, including a significant 40+ audience. Use large controls, plain language, persistent navigation, minimal nesting, and clear confirmation messages.

### Core product principles

1. Five-item primary navigation only.
2. One universal feed instead of separate photo, video, status, hotlist, and meet pages.
3. One universal profile route with modules that change by profile type.
4. One universal create composer that changes by profile permissions.
5. Private messaging only; no public chatrooms.
6. Event and club discussion belongs inside event and club pages, not a large forum system.
7. Brazil-only launch, using state, city, and distance filters.
8. Mandatory adult and identity verification before full access.
9. Pseudonymous public identity is allowed; legal identity is kept private.
10. Sensitive data and advertising must be handled conservatively.

---

# 1. Simplified information architecture

## 1.1 Public routes

- `/` - public landing page
- `/login` - login
- `/register` - account creation
- `/verify-age` - age and identity verification
- `/forgot-password` - password recovery
- `/safety` - public trust and safety information
- `/help` - public help centre
- `/legal/terms` - terms
- `/legal/privacy` - privacy policy
- `/legal/content` - content and community rules
- `/legal/professionals` - professional account rules
- `/legal/cookies` - cookies and tracking

## 1.2 Authenticated primary navigation

Use a five-item bottom navigation on mobile and a compact side/top navigation on desktop.

1. **Home**
   - Hybrid feed
   - For You
   - Nearby
   - Following
   - Events
   - Professionals

2. **Explore**
   - Search profiles
   - Search clubs
   - Search events
   - Search professionals
   - Filters
   - Saved searches

3. **Create**
   - Opens a modal or bottom sheet
   - Options depend on account type

4. **Messages**
   - Private conversations
   - Message requests
   - Optional invited group conversations

5. **Profile**
   - Public profile preview
   - Edit profile
   - Media manager
   - Saved items
   - Reviews
   - Subscription
   - Settings
   - Safety and privacy

## 1.3 Features that must not be separate top-level pages

- Hotlist becomes **Saved** inside Profile.
- Pics becomes media inside Home and Profile.
- Get More becomes **Subscription** inside Profile.
- Meet Today becomes a post type inside Home and Create.
- Site news becomes notifications and occasional official feed cards.
- General forums are not part of the MVP.
- Chatrooms and webcam rooms are not included.
- Country selection is not included at launch; Brazil is fixed.

---

# 2. Global application shell

## 2.1 Header

- Fervo Social logo
- Current city or location mode
- Search icon
- Notifications icon
- Discreet exit button
- Profile avatar

## 2.2 Bottom navigation

- Home
- Explore
- Create
- Messages
- Profile

Each item must show an icon and text label. Do not rely on icons alone.

## 2.3 Global overlays

- Notifications drawer
- Search sheet
- Filter sheet
- Create composer
- Report sheet
- Block confirmation
- Subscription upsell
- Language selector
- Quick privacy controls

## 2.4 Discreet-use controls

- Neutral browser title option
- Neutral PWA icon option
- PIN lock
- Hide notification previews
- Panic logout
- Clear local session data
- Disable autoplay sound by default

---

# 3. Home: hybrid Reels and feed

## 3.1 Feed model

The feed uses vertically stacked immersive cards. Media posts can occupy most of the viewport like Reels, while text and event cards use a shorter feed-card layout. Users scroll vertically through all content types without leaving Home.

### Feed tabs

Keep the visible tabs limited to five horizontal chips:

- For You
- Nearby
- Following
- Events
- Professionals

Additional filters open in a bottom sheet.

## 3.2 Feed content types

### A. Photo post

- One image or carousel
- Caption
- Profile name and verification badge
- Distance band
- Profile type marker
- Like or reaction
- Comment
- Save
- Message
- Report

### B. Video post

- Vertical video
- Muted autoplay
- Tap to unmute
- Pause control
- Caption and content warning
- Same actions as photo post

### C. Text or status post

Examples:

- "Looking for a couple tonight"
- "Travelling to Sao Paulo this weekend"
- "Who is attending this event?"
- "Available to chat"
- "Looking for a social meeting first"

Fields:

- Post category
- Short message
- Desired profile types
- Approximate location
- Expiry time
- Reply or message button

### D. Meet Now post

- Available today or tonight
- Time window
- Approximate area
- Desired audience
- Travel or host status
- Verification requirement
- Auto-expiry
- Respond button

### E. Event card

- Cover image or video
- Event name
- Date and time
- Venue or organiser
- Location
- Price or free
- RSVP status
- Attendance visibility
- Open event button

### F. Club or business card

- Venue image
- Club name
- Verified badge
- Location
- Next event
- Rating
- Official WhatsApp community button
- Follow and view profile

### G. Professional availability card

- Professional profile image or video
- Verified professional badge
- City or service area
- Availability window
- Services summary where lawful
- Private gallery request
- Message or enquiry
- Reviews summary

### H. Safety and education card

- Safe meeting reminders
- Sexual health information
- Consent reminders
- Scam warnings
- Platform updates

These cards should appear occasionally and be clearly marked as Fervo guidance.

### I. Sponsored card

- Clearly labelled "Sponsored"
- Contextual only
- Suitable categories: verified clubs, events, sexual health, adult products, travel, hotels, and approved professional promotion
- No targeting based on sexual orientation, health data, private messages, or exact location

## 3.3 Feed ranking inputs

- Following relationships
- Approximate distance
- User-selected interests
- Profile type preferences
- Recency
- Verification status
- Event date proximity
- User blocks and exclusions
- Content quality and moderation state

Do not infer or expose sexual orientation beyond the preferences a user explicitly provides.

## 3.4 Feed interactions

- Like or react
- Comment where enabled
- Nudge
- Save
- Follow
- Message
- Request private media
- RSVP
- Share internal link
- Report
- Block

---

# 4. Explore and search

## 4.1 Explore tabs

- Members
- Clubs
- Events
- Professionals

## 4.2 Basic filters

Always visible:

- Location
- Distance
- Profile type
- Age range
- Verified only
- Online or recently active

## 4.3 Advanced filters

Hidden behind "More filters":

- Gender identity
- Sexual orientation
- Relationship structure
- Looking for
- Interests
- Boundaries
- Can travel
- Can host
- Available today
- Attending an event
- Languages
- Accessibility
- New profiles
- Public media available
- Professional category
- Business category

## 4.4 Search results

- Grid view
- Compact list view
- Privacy-safe map clusters
- Sort by relevance, distance, recent activity, newest, and next event
- Save search
- Search alert
- Clear filters

---

# 5. Universal Create composer

The Create button opens one composer. Available post types are determined by account type.

## 5.1 Private member options

- Photo post
- Video post
- Text or status post
- Looking for post
- Meet Now post

## 5.2 Club or business options

- Photo or video post
- Venue announcement
- Event
- Promotion
- Merchandise link
- Official WhatsApp community link

## 5.3 Event organiser options

- Event
- Event update
- Ticket announcement
- Last tickets or waitlist notice
- Post-event media

## 5.4 Professional options

- Portfolio photo or video
- Availability post
- Service-area update
- Professional announcement
- Private gallery preview
- Sponsored availability post

## 5.5 Composer controls

- Audience: public, followers, friends, private list
- Location precision
- Expiry time
- Comments on or off
- Content warning
- Face blur
- Media visibility
- Sponsored label where applicable
- Preview before publish

---

# 6. Messaging

## 6.1 Allowed messaging modes

- One-to-one private chat
- Message requests
- Consensual group chat created by inviting another profile
- Event-host messages
- Club support messages

No open chatrooms.

## 6.2 First contact

1. User sends a text-only introduction.
2. Recipient accepts, declines, or blocks.
3. Accepted conversation opens.
4. Media remains locked until the recipient approves media from that sender.
5. Either user can revoke media permission later.

## 6.3 Conversation features

- Text
- Emoji
- Voice notes
- Approved images and videos
- Expiring media option
- Reply and quote
- Search conversation
- Save message
- Mute
- Archive
- Report
- Block
- Invite another verified profile

## 6.4 External WhatsApp links

Only verified clubs, businesses, organisers, and professionals may display an official WhatsApp link.

Before opening WhatsApp, show:

- The user is leaving Fervo Social.
- Fervo cannot moderate off-platform conversations.
- The destination account name and verification state.

---

# 7. Profile model

Use one route: `/profile/[handle]`.

The renderer changes modules according to `profile_type`.

## 7.1 Shared profile header

- Avatar or cover
- Display name
- Verification badges
- Account-type badge
- Approximate location
- Last active or hidden
- Follow
- Save
- Nudge
- Message
- Report
- Block

## 7.2 Shared profile tabs

- About
- Media
- Posts
- Reviews where applicable
- Events where applicable

Keep no more than five tabs.

---

# 8. Profile type A: Private member

## 8.1 Supported compositions

- Single person
- Couple
- Multi-partner relationship
- Group or household

Each represented adult must verify separately.

## 8.2 Private profile modules

- About
- Profile composition
- Individual member details
- Gender identities
- Pronouns
- Sexual orientations
- Relationship structure
- Looking for
- Interests
- Boundaries
- Travel and host status
- Public, friends, and private galleries
- Posts
- Events attending if visible
- Mutual connections

## 8.3 Private profile permissions

Can:

- Browse and follow
- Post media and text
- Create Meet Now posts
- Message according to plan limits
- Create private gallery grants
- RSVP to events
- Review clubs, events, and professionals after verified interaction
- Save profiles and events

Cannot:

- Advertise paid services from a private profile
- Create a verified business listing
- Publish ticketed events without an organiser or business profile

---

# 9. Profile type B: Club or business

## 9.1 Suitable businesses

- Swing club
- Nightclub
- Venue
- Adult event space
- Sexual health organisation
- Adult retailer
- Approved adult-sector business

## 9.2 Club or business modules

- Business description
- Verified business badge
- State and city
- Address visibility rules
- Opening hours
- Contact and official WhatsApp
- Facilities
- Accessibility
- Dress code
- Entry rules
- Consent and photography policy
- Media gallery
- Upcoming events
- Merchandise links
- Reviews
- Announcements
- Staff accounts

## 9.3 Club or business permissions

Can:

- Publish posts and promotions
- Create events
- Link official WhatsApp community
- Sell or link merchandise where approved
- Respond to reviews
- View business analytics
- Add staff roles
- Sponsor feed cards

Cannot:

- Access private member information because a member follows or RSVPs
- Message large numbers of users without consent
- Use member identity or orientation data for external advertising

---

# 10. Profile type C: Event organiser

## 10.1 Organiser modules

- Organiser description
- Verified organiser badge
- Event categories
- Past and upcoming events
- Reviews
- Contact route
- Official WhatsApp link
- Media gallery

## 10.2 Event creation fields

- Event name
- Cover image or video
- Date and time
- Venue or approximate location
- Price
- Ticket types
- Capacity
- Invited profile types
- Age or verification rules
- Dress code
- Accessibility
- House rules
- Consent policy
- Photography policy
- Refund and cancellation policy
- Private or visible RSVP list
- Event discussion

## 10.3 Organiser permissions

Can:

- Create and manage events
- Manage RSVP and waitlists
- Sell tickets where approved
- Send event updates
- Moderate event discussion
- Check in attendees
- Request post-event reviews
- Sponsor event cards

---

# 11. Profile type D: Professional

Use the public label **Professional**. During onboarding, the account can select an approved category such as independent escort, independent sex worker, performer, creator, educator, or another lawful adult professional category.

## 11.1 Professional modules

- Professional display name
- Verified adult badge
- Verified professional badge
- Category
- City and service area
- Availability
- Services summary where lawful
- Prices or rate guidance where lawful
- Session duration where lawful
- Languages
- Accessibility
- Safety and boundary information
- Public portfolio
- Private galleries
- Posts and availability updates
- Public client reviews
- Professional response to reviews
- Contact or enquiry button

## 11.2 Professional permissions

Can:

- Publish professional availability
- Upload portfolio images and videos
- Manage public and private galleries
- Set service areas
- Receive enquiries
- Display approved rates and service information where lawful
- Receive verified-interaction reviews
- Write structured professional-only safety feedback about verified clients
- Sponsor posts
- View analytics on profile and enquiry activity

Cannot:

- Represent another adult who has not directly verified and consented
- Advertise minors or prohibited activity
- Publish another person's legal identity
- Publish unrestricted allegations about clients
- Use private-client feedback as a public blacklist

---

# 12. Reviews and reputation

## 12.1 Club and event reviews

Only users with a verified visit or RSVP may review.

Fields:

- Visit date
- Cleanliness
- Staff conduct
- Safety
- Atmosphere
- Accessibility
- Accuracy of listing
- Optional moderated text

## 12.2 Public professional reviews

Only after a verified interaction.

Verification options:

- Both parties confirm they met
- One-time interaction code
- In-platform appointment or enquiry confirmation where lawful

Fields:

- Profile/media accuracy
- Communication
- Respect for boundaries
- Punctuality
- Overall experience
- Optional moderated text

Do not require explicit service details.

## 12.3 Professional-only client safety feedback

Do not implement this as an unrestricted hidden star rating or blacklist. Use a structured safety system visible only to verified professionals.

Allowed structured fields:

- Identity matched profile
- Communication respectful
- Arrived as agreed
- Cancellation or no-show
- Boundary concern
- Payment dispute where applicable
- Safety incident reported

Rules:

- Only after a verified interaction
- No comments about protected attributes
- No explicit sexual details
- Severe allegations go to moderation before visibility
- Client is notified when a negative safety flag affects account access
- Client can appeal
- Professionals see aggregates and moderated factual tags, not private identifying narratives

---

# 13. Membership plans, billing periods, and launch pricing

All prices below are launch hypotheses for Brazil, not permanent promises. Store prices in configuration or a billing database; do not hard-code them in UI components. Validate through customer interviews, landing-page tests, conversion data, churn data, and professional/club outreach.

## 13.0 Billing periods

Use the following customer-facing names in Brazilian Portuguese:

- **Mensal** — monthly billing at the standard monthly price.
- **Quadrimestral** — four months paid in advance with a 10% discount.
- **Anual** — twelve months paid in advance with a 20% discount.

Do not call the four-month option "thirds". The correct product term is **four-month plan** in English and **plano quadrimestral** in Portuguese.

Discounted periods are paid upfront. The checkout must display the total charge, effective monthly equivalent, renewal date, cancellation rules, and whether renewal is automatic. PIX may be non-recurring; card subscriptions may be recurring only with explicit consent.

## 13.1 Private accounts

### Free — R$0

- Browse Home and Explore
- Basic filters
- 3 first-contact requests per day
- Unlimited replies
- Up to 8 photos
- 1 short video
- 1 private album
- RSVP to events
- Standard sponsored-card frequency

### Plus

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$19.90 | R$19.90 | 0% |
| Four months prepaid | R$71.64 | R$17.91 | 10% |
| Annual prepaid | R$191.04 | R$15.92 | 20% |

Benefits:

- Unlimited first-contact requests subject to anti-spam limits
- Up to 30 photos
- Up to 5 videos
- 5 private albums
- See profile visitors
- Saved searches
- Reduced sponsored-card frequency
- Longer Meet Now duration
- Custom gallery expiry

### Premium

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$39.90 | R$39.90 | 0% |
| Four months prepaid | R$143.64 | R$35.91 | 10% |
| Annual prepaid | R$383.04 | R$31.92 | 20% |

Benefits:

- Up to 100 photos
- Up to 20 videos
- Advanced filters
- Travel mode
- Priority verification queue
- Higher-quality media
- Monthly profile-boost credit
- Advanced privacy controls
- Profile analytics
- Lowest sponsored-card frequency

### VIP

Do not launch VIP initially. Add it only after Fervo has real club and event partners that can provide measurable benefits such as discounts, early access, priority entry, ticket bundles, or partner rewards.

## 13.2 Founding Club programme — first year free

Launch a **Founding Club Pro** acquisition programme for approved Brazilian clubs and venues.

Offer structure:

- Business Pro entitlement free for 12 months from account activation.
- No card, PIX mandate, or payment authorisation required to activate the free year.
- No automatic paid conversion and no automatic charge at expiry.
- The regular future price and included features are shown clearly at invitation acceptance.
- Renewal reminders at 90, 30, 7, and 1 day before expiry.
- At expiry, the Pro entitlement ends automatically unless the club actively purchases a plan.
- Recommended behaviour: downgrade the account to a free **Basic Directory Listing** rather than delete or hide the club entirely. The club keeps its identity, address, and existing reviews, but loses Pro media limits, event promotion, staff seats, analytics, and new-event publishing.
- Clubs may choose Business Starter or Business Pro at renewal; do not force renewal into Pro.
- Track invitation source, activation date, usage, event creation, leads, renewal intent, conversion, and churn.

This removes fear of surprise charges while allowing clubs to become dependent on useful Pro workflows before choosing whether to pay.

## 13.3 Club or business accounts after the free year

### Basic Directory Listing — R$0

- Verified or claimed club name
- Basic address and contact information
- Limited gallery
- Existing reviews remain visible
- No active event publishing
- No promotion credits
- No advanced analytics

### Business Starter

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$99.00 | R$99.00 | 0% |
| Four months prepaid | R$356.40 | R$89.10 | 10% |
| Annual prepaid | R$950.40 | R$79.20 | 20% |

Benefits:

- Verified page
- 30 photos
- 5 videos
- 2 active events per month
- Reviews
- Official WhatsApp link
- Basic analytics
- 1 staff account

### Business Pro

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$199.00 | R$199.00 | 0% |
| Four months prepaid | R$716.40 | R$179.10 | 10% |
| Annual prepaid | R$1,910.40 | R$159.20 | 20% |

Benefits:

- 100 photos
- 20 videos
- Unlimited events
- Merchandise links
- Advanced analytics
- 5 staff accounts
- Review-response tools
- Monthly sponsored-post credit

### Business Enterprise — custom

- Multiple venues
- Central staff management
- API or ticketing integration
- Account manager

## 13.4 Event organiser accounts

### Organizer Starter

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$49.00 | R$49.00 | 0% |
| Four months prepaid | R$176.40 | R$44.10 | 10% |
| Annual prepaid | R$470.40 | R$39.20 | 20% |

- 2 active events per month
- RSVP and waitlist
- Event discussion
- Basic analytics
- Standard ticket fee where ticketing is enabled

### Organizer Pro

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$149.00 | R$149.00 | 0% |
| Four months prepaid | R$536.40 | R$134.10 | 10% |
| Annual prepaid | R$1,430.40 | R$119.20 | 20% |

- Unlimited events
- Ticketing and check-in
- Advanced analytics
- Multiple staff accounts
- Sponsored-event credits
- Reduced ticket fee where enabled

## 13.5 Professional accounts

Professional profiles must complete verification before becoming public.

The attached PhotoAcompanhantes pricing screenshot is not an official public rate card; it reports an approximate starting point of about R$60 per week based on third-party reports and states that actual prices depend on location and promotion options. Treat it as a directional signal, not a reliable benchmark. PhotoAcompanhantes also sells advertising visibility, which is not directly equivalent to a Fervo membership containing social, gallery, messaging, review, and safety tools.

Use the following prices as **launch pricing**. Do not promise a lifetime price. A founding professional may be guaranteed the launch rate for the first 12 paid months, after which Fervo may change the list price with advance notice.

### Professional Essential

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$49.90 | R$49.90 | 0% |
| Four months prepaid | R$179.64 | R$44.91 | 10% |
| Annual prepaid | R$479.04 | R$39.92 | 20% |

- Verified professional page
- 20 photos
- 5 videos
- Public and private galleries
- Availability posts
- Service area
- Public verified-interaction reviews
- Professional-only client safety feedback
- Basic analytics

### Professional Pro

| Billing period | Total price | Effective monthly price | Discount |
|---|---:|---:|---:|
| Monthly | R$99.90 | R$99.90 | 0% |
| Four months prepaid | R$359.64 | R$89.91 | 10% |
| Annual prepaid | R$959.04 | R$79.92 | 20% |

- 100 photos
- 20 videos
- Multiple service areas
- Advanced gallery controls
- Priority placement credits
- Advanced analytics
- Scheduled availability posts
- Enhanced review tools
- Sponsored-post discounts

### Future international visibility

Do not build international country add-ons into the Brazil MVP. Model the billing system so that future add-ons can enable visibility in additional countries or regions. Activate an add-on only after Fervo has local supply, moderation, localisation, age-assurance, legal review, and payment support in that market.

## 13.6 Advertising model

Fervo may retain advertising revenue, but use contextual sponsored cards rather than behavioural advertising based on sensitive profile data.

- Free members: sponsored card approximately every 8 to 12 feed items
- Plus members: approximately every 20 feed items
- Premium members: only occasional partner offers and platform promotions
- No full-screen interstitial ads
- No ads inserted into private messages
- No targeting from sexual orientation, private messages, health information, private galleries, professional safety feedback, or exact location

## 13.7 Billing and renewal requirements

- Support PIX and approved card processors.
- Store plan prices and discounts in database/configuration, not code constants.
- Display total payable amount before confirmation.
- Send payment, renewal, expiry, cancellation, and failed-payment notifications.
- Make cancellation accessible from the account area.
- Record explicit consent for recurring billing.
- Never convert a free club promotion into a paid subscription without an affirmative purchase action.
- Use discreet but accurate billing descriptors.
- Keep receipts and billing history available to the account owner.

## 13.8 Membership wording

Fervo may use community-friendly branding such as "Supporter" in the interface, but invoices, terms, and tax treatment must accurately describe the paid product. Do not assume that calling a subscription a donation changes its legal or tax status. Obtain Brazilian legal and accounting advice.

---

# 14. Identity taxonomy and visual colour system

## 14.1 Important taxonomy correction

Do not place all of the following in one profile-type list:

- Man and woman are gender identities.
- Couple types describe profile composition.
- Bisexual, gay, lesbian, pansexual, and asexual are orientations.
- Travesti and trans are gender identities.
- Cross-dresser describes expression or practice and is not automatically a gender or orientation.
- Professional, club, and organiser are account classes.

Store and display these as separate fields.

## 14.2 Two-layer visual marker

To preserve the colour-line idea without confusing users:

- Inner ring: profile composition or primary gender marker
- Small badge or outer corner marker: account class
- Orientation: text chip with optional pride-colour stripe
- Always show a text label; colour is never the only indicator

## 14.3 Base design colours

- Background: `#0B0B12`
- Surface: `#151522`
- Raised surface: `#1E1E2E`
- Primary purple: `#8B5CF6`
- Secondary purple: `#A855F7`
- Text: `#F5F3FF`
- Muted text: `#A9A3B5`
- Success: `#34D399`
- Warning: `#F59E0B`
- Error: `#EF4444`

## 14.4 Profile-composition ring colours

- Man: `#2F80ED`
- Woman: `#EB5757`
- Man/woman couple: split gradient `#2F80ED` and `#EB5757`
- Man/man couple: split gradient `#2F80ED` and `#56CCF2`
- Woman/woman couple: split gradient `#EB5757` and `#F299C2`
- Mixed or multi-person group: segmented ring generated from member markers
- Non-binary or self-described composition: purple/yellow neutral palette with text label

## 14.5 Account-class markers

- Private member: purple `#8B5CF6`
- Club or business: gold `#D4AF37`
- Event organiser: orange `#F59E0B`
- Professional: pink `#FF4FA3`
- Official Fervo safety content: teal `#14B8A6`

## 14.6 Optional orientation chips

- Bisexual: `#D60270`, `#9B4F96`, `#0038A8`
- Gay or broad LGBTQ identity: six-colour rainbow chip
- Lesbian: orange-to-pink chip; provide text because no single lesbian flag is universally adopted
- Pansexual: `#FF218C`, `#FFD800`, `#21B1FF`
- Asexual: black, grey, white, purple
- Trans: light blue, light pink, white

## 14.7 Travesti and cross-dresser presentation

Do not invent a supposedly official universal colour if there is no broadly accepted standard.

- Travesti: use the person's chosen text identity and an optional trans or custom identity chip selected by the user
- Trans woman or trans man: use the trans-colour chip if selected
- Cross-dresser: use a text chip and optional platform-defined lavender/silver accent, clearly described as Fervo styling rather than an official community flag

---

# 15. Profile and account settings

Keep settings inside one Profile area with accordion sections or tabs.

## 15.1 Profile settings

- Edit public profile
- Member details
- Identity and orientation
- Looking for
- Interests and boundaries
- Location precision
- Availability

## 15.2 Media settings

- Profile image
- Albums
- Uploads
- Private grants
- Face blur
- Watermarking
- Access history

## 15.3 Social settings

- Followers
- Friends
- Saved profiles
- Nudges
- Blocked profiles
- Message filters

## 15.4 Privacy and safety

- Who can find me
- Who can message me
- Online status
- Distance visibility
- Event attendance visibility
- Media permissions
- Report history
- Panic logout

## 15.5 Account and billing

- Email
- Password
- Two-factor authentication
- Active sessions
- Language
- Subscription
- Billing history
- Data export
- Pause account
- Delete account

---

# 16. Verification and onboarding

## 16.1 Registration steps

1. Choose account class: Private, Club/Business, Event Organizer, or Professional
2. Email, password, username, and date of birth
3. Mandatory age and identity verification
4. Choose profile composition
5. Complete identity, orientation, and relationship fields
6. Set location precision
7. Set looking-for preferences
8. Set privacy and media defaults
9. Upload profile image
10. Accept account-specific terms
11. Submit for automated and human review where required

## 16.2 Verification badges

- Age verified
- Photo verified
- All profile members verified
- Professional verified
- Business verified
- Event organiser verified

Badges must state exactly what was checked. They must not imply guaranteed safety.

---

# 17. Safety and moderation

## 17.1 User safety tools

- Block
- Mute
- Report
- Media permission controls
- Private gallery expiry
- Trusted-contact option
- Safer meeting reminders
- Scam warning
- Discreet notifications

## 17.2 Moderation pipeline

1. Automated upload checks
2. Malware and metadata stripping
3. Hash matching and policy classifiers
4. Quarantine high-risk content
5. Human review
6. Warning, restriction, suspension, or ban
7. User notification
8. Appeal
9. Audit log

## 17.3 High-priority reports

- Underage concern
- Child sexual abuse material
- Non-consensual intimate imagery
- Threats or stalking
- Coercion or trafficking
- Impersonation
- Violence
- Professional safety incident

## 17.4 Brazil compliance gates

Before launch, obtain formal advice on:

- Lei 15.211/2025 and reliable age verification
- LGPD and sensitive data about sexual life, biometrics, health, and location
- Marco Civil da Internet
- ECA child-protection requirements
- Consumer law
- Professional account and commercial-service functionality
- Reviews and defamation risk
- Payment processors and adult-business restrictions
- Sao Paulo operational requirements

---

# 18. Data model for the initial build

## 18.1 Core account tables

- `users`
- `auth_identities`
- `sessions`
- `profiles`
- `profile_members`
- `profile_type`
- `identity_terms`
- `profile_identity_terms`
- `relationship_structures`
- `discovery_preferences`
- `verifications`

## 18.2 Feed and content tables

- `posts`
- `post_media`
- `post_audiences`
- `post_reactions`
- `post_comments`
- `post_saves`
- `post_reports`
- `meet_now_details`
- `sponsored_campaigns`

## 18.3 Media tables

- `albums`
- `media_assets`
- `album_grants`
- `media_views`
- `media_permissions`
- `media_moderation_results`

## 18.4 Social tables

- `follows`
- `friend_requests`
- `connections`
- `nudges`
- `blocks`
- `mutes`
- `profile_views`

## 18.5 Messaging tables

- `threads`
- `thread_members`
- `messages`
- `message_requests`
- `message_media_permissions`
- `message_reports`

## 18.6 Club, event, and organiser tables

- `business_profiles`
- `business_staff`
- `venues`
- `events`
- `event_ticket_types`
- `rsvps`
- `waitlist_entries`
- `event_checkins`
- `event_updates`

## 18.7 Professional tables

- `professional_profiles`
- `professional_categories`
- `professional_service_areas`
- `professional_availability`
- `professional_rate_items`
- `professional_enquiries`
- `professional_reviews`
- `client_safety_feedback`

## 18.8 Review tables

- `review_eligibility`
- `reviews`
- `review_responses`
- `review_reports`
- `review_appeals`

## 18.9 Commercial tables

- `plans`
- `subscriptions`
- `invoices`
- `payments`
- `refunds`
- `promotion_credits`

## 18.10 Safety tables

- `reports`
- `report_evidence`
- `moderation_cases`
- `moderation_actions`
- `appeals`
- `audit_events`

---

# 19. Permission matrix

| Capability | Private | Club/Business | Organizer | Professional |
|---|---:|---:|---:|---:|
| Publish photo/video | Yes | Yes | Yes | Yes |
| Publish Looking For | Yes | No | No | Availability only |
| Publish Meet Now | Yes | No | No | Professional availability only |
| Create event | No | Yes | Yes | Only approved professional events |
| Sell tickets | No | Approved | Approved | No by default |
| Display services/rates | No | Business services only | No | Where lawful and approved |
| Official WhatsApp link | No by default | Yes | Yes | Yes |
| Receive public reviews | No | Yes | Yes | Yes |
| Write public reviews | Yes | Yes after eligible interaction | Yes after eligible interaction | Yes after eligible interaction |
| See professional-only client safety feedback | No | No | No | Yes |
| Sponsor feed post | Optional later | Yes | Yes | Yes |
| Add staff | No | Yes | Yes | Optional assistant later |

---

# 20. Next.js route and component structure

```text
app/
  (public)/
    page.tsx
    login/page.tsx
    register/page.tsx
    verify-age/page.tsx
    forgot-password/page.tsx
    safety/page.tsx
    help/page.tsx
    legal/[slug]/page.tsx

  (authenticated)/
    layout.tsx
    home/page.tsx
    explore/page.tsx
    messages/page.tsx
    messages/[threadId]/page.tsx
    profile/[handle]/page.tsx
    event/[eventId]/page.tsx
    me/page.tsx

components/
  navigation/
    AppHeader.tsx
    BottomNav.tsx
    DesktopNav.tsx
  feed/
    Feed.tsx
    FeedCard.tsx
    PhotoPostCard.tsx
    VideoPostCard.tsx
    TextPostCard.tsx
    MeetNowCard.tsx
    EventCard.tsx
    ClubCard.tsx
    ProfessionalCard.tsx
    SafetyCard.tsx
    SponsoredCard.tsx
  composer/
    CreateSheet.tsx
    MediaComposer.tsx
    TextComposer.tsx
    MeetNowComposer.tsx
    EventComposer.tsx
    ProfessionalAvailabilityComposer.tsx
  profile/
    ProfileHeader.tsx
    ProfileIdentityRing.tsx
    ProfileTabs.tsx
    PrivateProfileModules.tsx
    BusinessProfileModules.tsx
    OrganizerProfileModules.tsx
    ProfessionalProfileModules.tsx
  discovery/
    ExploreTabs.tsx
    BasicFilters.tsx
    AdvancedFilterSheet.tsx
    ResultGrid.tsx
  messages/
    ThreadList.tsx
    MessageRequestCard.tsx
    Conversation.tsx
    MediaPermissionPrompt.tsx
  reviews/
    ReviewSummary.tsx
    ReviewForm.tsx
    ProfessionalSafetyFeedback.tsx
  safety/
    ReportSheet.tsx
    BlockDialog.tsx
    ConsentPrompt.tsx
  subscription/
    PlanComparison.tsx
    UpgradeSheet.tsx
```

---

# 21. MVP delivery order

## Phase 1 - Foundation

- Public landing page
- Login and registration
- Mandatory verification
- Private profile onboarding
- Home hybrid feed
- Explore and basic filters
- Private messaging
- Public/friends/private galleries
- Block and report
- Free and Plus private plans

## Phase 2 - Social depth

- Video posts
- Meet Now posts
- Follows, friends, saves, nudges
- Profile visitors
- Saved searches
- Premium private plan
- Comments and reactions
- Contextual sponsored cards

## Phase 3 - Clubs and events

- Club/business profiles
- Organizer profiles
- Events
- RSVP and waitlist
- Event discussion
- Reviews
- Official WhatsApp links
- Business and organiser subscriptions

## Phase 4 - Professionals

- Professional verification
- Professional Essential and Pro plans
- Portfolio and private galleries
- Availability posts
- Public verified-interaction reviews
- Professional-only structured client safety feedback
- Professional promotion

## Phase 5 - Scale and commercial tools

- Ticketing
- Check-in
- Advanced analytics
- Multiple staff accounts
- Merchandise links
- Business enterprise plans
- Spanish and English localisation

---

# 22. Decisions that should be changed or clarified before coding

## A. Do not use one list for profile type, gender, and orientation

This is the most important structural correction. The current notes mix man, woman, couple type, travesti, trans, cross-dresser, bisexual, gay, lesbian, pansexual, and asexual in one list. They must be separate fields.

## B. Do not rely on colour alone

Keep colour lines, but always include text labels and icons. A user can be a bisexual man, a trans woman, a professional, and part of a couple at the same time. One colour cannot accurately communicate all of that.

## C. Do not launch VIP yet

VIP requires real partner benefits. Launch Free, Plus, and Premium first.

## D. Do not create a hidden unrestricted client blacklist

Use structured, moderated professional safety feedback with appeal rights. This protects professionals without creating an unreviewable reputation system.

## E. Do not use "Supporter" wording as a tax strategy

It may be used as marketing language, but paid benefits should be treated and documented as subscriptions or memberships unless Brazilian legal and accounting advice says otherwise.

## F. Keep ads, but make them contextual

Advertising based on sexual orientation, private messages, health, or precise location creates severe privacy risk. Use clearly labelled contextual sponsored cards.

## G. Keep professional commercial features behind a legal feature flag

The professional profile can be designed now, but rate display, booking, payment, agency functionality, and service categories must be enabled only after legal and payment-provider approval.

## H. Keep event and club communities simple

Use event discussion, club posts, and optional official WhatsApp links. Do not rebuild a large forum and chatroom system.

---

# 23. Codex definition of done for the first prototype

The first interactive prototype is complete when a tester can:

1. Register as a private member.
2. Complete age verification placeholder flow.
3. Create a profile and choose identity fields separately.
4. View the hybrid feed.
5. Filter nearby profiles.
6. Create a photo, text, and Meet Now post.
7. Open a profile.
8. Send a text-only introduction.
9. Approve media permission.
10. Request a private album.
11. Save and follow profiles.
12. Open an event and RSVP privately.
13. Block and report a profile.
14. Compare Free, Plus, and Premium plans.
15. View responsive mobile and desktop layouts.

The second prototype should add the Club, Event Organizer, and Professional profile variants using the same universal profile route and shared component system.
