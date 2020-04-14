
/**
 * TypeScript type definitions for Facebook Graph API version 2.8
 * https://developers.facebook.com/docs/graph-api/reference
 *
 * Definitions by: Alex Siman https://github.com/siman
 */
/**
 * Custom edits to match SlackMap conventions
 */
// declare module FbGraphApi {

  export type FbDateTime = string;

  export type FbProfile =
    FacebookUserModel | FbPage | FbGroup | FbEvent | FbApp;

  export type FbPrivacy =
    "CLOSED" | "OPEN" | "SECRET";

  export type FbAlbumType =
    "app" | "cover" | "profile" | "mobile" | "wall" | "normal" | "album";

  export type FbEntityAtTextRangeType =
    "user" | "page" | "event" | "group" | "application";

  export type FbPriceRange =
    "$" | "$$" | "$$$" | "$$$$" | "Unspecified";

  export type FbVideoStatusEnum =
    "ready" | "processing" | "error";

  export type FbAppSupportedPlatforms =
    "WEB" | "CANVAS" | "MOBILE_WEB" | "IPHONE" | "IPAD" | "ANDROID" | "WINDOWS" |
    "AMAZON" | "SUPPLEMENTARY_IMAGES" | "GAMEROOM";

  /** Fields for a Facebook User */
  export interface FacebookUserModel {

    /** The ID of this person's user account. This ID is unique to each app and
     * cannot be used across different apps. Our upgrade guide provides more
     * information about app-specific IDs */
    id: string;

    /** @deprecated Returns no data as of April 4, 2018. */
    about: string;

    /** The User's address. */
    address: FbLocation;

    /** Notes added by viewing page on this User. */
    admin_notes: FbPageAdminNote[];

    /** The age segment for this person expressed as a minimum and maximum age.
     * For example, more than 18, less than 21. */
    age_range: FbAgeRange;

    /** The authentication method a Workplace User has configured for their
     * account. It can be either "password" or "sso". */
    auth_method: 'password' | 'sso';

    /** The person's birthday. This is a fixed format string, like MM/DD/YYYY.
     * However, people can control who can see the year they were born
     * separately from the month and day so this string can be only the year
     * (YYYY) or the month + day (MM/DD) */
    birthday: string;

    /** Can the person review brand polls */
    can_review_measurement_request: boolean;

    context: FbUserContext;

    /** @deprecated The person's cover photo */
    cover: FbCoverPhoto;

    /** @deprecated The person's local currency information */
    currency: FbCurrency;

    /** @deprecated The list of devices the person is using. This will return
     * only iOS and Android devices */
    devices: FbUserDevice[];

    /** @deprecated Returns no data as of April 4, 2018. */
    education: FbEducationExperience[];

    /** The User's primary email address listed on their profile. This field
     * will not be returned if no valid email address is available. */
    email: string;

    employee_number: string;

    /** Athletes the User likes. */
    favorite_athletes: FbExperience[];

    /** Sports teams the User likes. */
    favorite_teams: FbExperience[];

    /** The person's first name */
    first_name: string;

    /** The gender selected by this person, male or female. If the gender is set
     * to a custom value, this value will be based off of the preferred pronoun;
     * it will be omitted if the preferred pronoun is neutral */
    gender: string;

    /** The person's hometown */
    hometown: FbPage;

    /** The person's inspirational people */
    inspirational_people: FbExperience[];

    /** Install type (this is an enum, presumably a string enum, but its values
     * are not documented) */
    install_type: string;

    /** Is the app making the request installed */
    installed: boolean;

    /** @deprecated Returns no data as of April 4, 2018. */
    interested_in: string[];

    /** If the user has used FAME deeplinking */
    is_famedeeplinkinguser: boolean;

    /** @deprecated Is the user eligible for messenger platform payment */
    is_payment_enabled: boolean;

    /** Is this a shared login (e.g. a gray user) */
    is_shared_login: boolean;

    /** @deprecated People with large numbers of followers can have the
     * authenticity of their identity manually verified by Facebook. This field
     * indicates whether the person's profile is verified in this way. This is
     * distinct from the verified field */
    is_verified: boolean;

    /** Labels applied by viewing page on this person */
    labels: FbPageLabel[];

    /** Facebook Pages representing the languages this person knows */
    languages: FbExperience[];

    /** @deprecated Last Ad referral for the user. */
    last_ad_referral: FbMessengerPlatformReferral;

    /** The person's last name */
    last_name: string;

    /** A link to the person's Timeline. The link will only resolve if the
     * person clicking the link is logged into Facebook and is a friend of the
     * person whose profile is being viewed. */
    link: string;

    /** @deprecated Display megaphone for local news bookmark */
    local_news_megaphone_dismiss_status: boolean;

    /** @deprecated Daily local news notification */
    local_news_subscription_status: boolean;

    /** @deprecated The person's locale */
    locale: string;

    /** The person's current location as entered by them on their profile. This
     * field is not related to check-ins */
    location: FbPage;

    /** What the person is interested in meeting for */
    meeting_for: string[];

    /** The person's middle name */
    middle_name: string;

    /** The person's full name */
    name: string;

    /** The person's name formatted to correctly handle Chinese, Japanese, or
     * Korean ordering */
    name_format: string;

    /** The person's payment pricepoints */
    payment_pricepoints: FbPaymentPricepoints;

    /** @deprecated Returns no data as of April 4, 2018. */
    political: string;

    /** The profile picture URL of the Messenger user. The URL will expire. */
    profile_pic: string;

    /** The person's PGP public key */
    public_key: string;

    /** The person's favorite quotes */
    quotes: string;

    /** @deprecated Returns no data as of April 4, 2018. */
    relationship_status: string;

    /** @deprecated Returns no data as of April 4, 2018. */
    religion: string;

    /** Security settings */
    security_settings: FbSecuritySettings;

    /** The time that the shared login needs to be upgraded to Business Manager
     * by.  Will be ISO-8601 string format, or UNIX epoch format if
     * `date_format=U` used in Graph API call.  */
    shared_login_upgrade_required_by: FbDateTime;

    /** Shortened, locale-aware name for the person */
    short_name: string;

    /** The person's significant other */
    significant_other: FacebookUserModel;

    /** Sports played by the person */
    sports: FbExperience[];

    /** Platform test group (this is an unsigned, 32-bit integer) */
    test_group: number;

    /** @deprecated A string containing an anonymous, unique identifier for the
     * User, for use with third-parties. Deprecated for versions 3.0+. Apps
     * using older versions of the API can get this field until January 8, 2019.
     * Apps installed by the User on or after May 1st, 2018, cannot get this
     * field. */
    third_party_id: string;

    /** @deprecated The person's current timezone offset from UTC (range: -24 to
     * 24) */
    timezone: number;

    /** A token that is the same across a business's apps. Access to this token
     * requires that the person be logged into your app or have a role on your
     * app. This token will change if the business owning the app changes */
    token_for_business: string;

    /** @deprecated Updated time. Will be ISO-8601 string format, or UNIX epoch
     * format if `date_format=U` used in Graph API call. */
    updated_time: FbDateTime;

    /** @deprecated Indicates whether the account has been verified. This is
     * distinct from the `is_verified` field. Someone is considered verified if
     * they take any of the following actions: Register for mobile; Confirm
     * their account via SMS; Enter a valid credit card */
    verified: boolean;

    /** Video upload limits */
    video_upload_limits: FbVideoUploadLimits;

    /** Can the viewer send a gift to this person? */
    viewer_can_send_gift: boolean;

    /** @deprecated Returns no data as of April 4, 2018. */
    website: string;

    /** @deprecated Returns no data as of April 4, 2018. */
    work: FbWorkExperience[];

  }

  export interface FbMessengerPlatformReferral {
    ad_id: string,
    id: string,
    ref: string,
    source: string,
    type: string,
  }

  export interface FbWorkExperience {
    id: string;
    description: string;
    employer: FbPage;
    end_date: string;
    from: FacebookUserModel;
    location: FbPage;
    position: FbPage;
    projects: FbProjectExperience[];
    start_date: string;
    with: FacebookUserModel[];
  }

  export interface FbProjectExperience {
    id: string;
    description: string;
    end_date: string;
    from: FacebookUserModel;
    name: string;
    start_date: string;
    with: FacebookUserModel[];
  }

  export interface FbVideoUploadLimits {
    length: number;
    size: number;
  }

  export interface FbSecuritySettings {
    secure_browsing: FbSecureBrowsing;
  }

  export interface FbSecureBrowsing {
    enabled: boolean;
  }

  export interface FbPaymentPricepoints {
    mobile: FbPaymentPricepoint[];
  }

  export interface FbPaymentPricepoint {
    credits: number;
    local_currency: string;
    user_price: string;
  }

  export interface FbPageLabel {
    creation_time: FbDateTime;
    creator_id: FbProfile;
    from: FbPage;
    id: string;
    name: string;
  }

  export interface FbPageInsights {
    period: "day" | "week" | "days_28" | "month" | "lifetime"
    metric: any[]
    since: FbDateTime
    until: FbDateTime
  }

  export interface FbExperience {
    id: string;
    description: string;
    from: FacebookUserModel;
    name: string;
    with: FacebookUserModel[];
  }

  export interface FbEducationExperience {
    id: string;
    classes: FbExperience[];
    concentration: FbPage[];
    degree: FbPage;
    school: FbPage;
    type: string;
    with: FacebookUserModel[];
    year: FbPage;
  }

  export interface FbUserDevice {
    hardware: string;
    os: string;
  }

  export interface FbCurrency {
    currency_offset: number;
    usd_exchange: number;
    usd_exchange_inverse: number;
    user_currency: string;
  }

  export interface FbUserContext {
    id: string;
  }

  export interface FbPageAdminNote {
    body: string;
    from: FbPage;
    id: string;
    user: FacebookUserModel;
  }

  export interface FbAgeRange {
    max: number;
    min: number;
  }

  export interface FbPage {
    id: string;
    about: string;
    access_token: string;
    ad_campaign: FbAdCampaign;
    affiliation: string;
    app_id: string;
    app_links: FbAppLinks;
    artists_we_like: string;
    attire: string;
    awards: string;
    band_interests: string;
    band_members: string;
    best_page: FbPage;
    bio: string;
    birthday: string;
    booking_agent: string;
    built: string;
    business: any; // Undocumented type.
    can_checkin: boolean;
    can_post: boolean;
    category: string;
    category_list: FbPageCategory[];
    checkins: number;
    company_overview: string;
    contact_address: FbMailingAddress;
    context: FbOpenGraphContext;
    country_page_likes: number;
    cover: FbCoverPhoto;
    culinary_team: string;
    current_location: string;
    description: string;
    description_html: string;
    directed_by: string;
    display_subtext: string;
    displayed_message_response_time: string;
    emails: string[];
    engagement: FbEngagement[]
    fan_count: number;
    featured_video: FbVideo;
    features: string;
    food_styles: string[];
    founded: string;
    general_info: string;
    general_manager: string;
    genre: string;
    global_brand_page_name: string;
    global_brand_root_id: string;
    has_added_app: boolean;
    hometown: string;
    hours: Map<string, string>;
    impressum: string;
    influences: string;
    instant_articles_review_status: string;
    is_always_open: boolean;
    is_community_page: boolean;
    is_permanently_closed: boolean;
    is_published: boolean;
    is_unclaimed: boolean;
    is_verified: boolean;
    is_webhooks_subscribed: boolean;
    leadgen_form_preview_details: any; // Undocumented type: LeadGenFormPreviewDetails.
    leadgen_tos_acceptance_time: FbDateTime;
    leadgen_tos_accepted: boolean;
    leadgen_tos_accepting_user: FacebookUserModel;
    link: string;
    location: FbLocation;
    members: string;
    merchant_id: string;
    merchant_review_status: string;
    mission: string;
    mpg: string;
    name: string;
    name_with_location_descriptor: string;
    network: string;
    new_like_count: string;
    offer_eligible: boolean;
    overall_star_rating: number;
    parent_page: FbPage;
    parking: FbPageParking;
    payment_options: FbPagePaymentOptions;
    personal_info: string;
    personal_interests: string;
    pharma_safety_info: string;
    phone: string;
    place_type: string;
    plot_outline: string;
    preferred_audience: FbTargeting;
    press_contact: string;
    price_range: FbPriceRange;
    produced_by: string;
    products: string;
    promotion_eligible: boolean;
    promotion_ineligible_reason: string;
    public_transit: string;
    publisher_space: any; // Undocumented type: PublisherSpace.
    rating_count: number;
    recipient: string;
    record_label: string;
    release_date: string;
    restaurant_services: FbPageRestaurantServices;
    restaurant_specialties: FbPageRestaurantSpecialties;
    schedule: string;
    screenplay_by: string;
    season: string;
    single_line_address: string;
    starring: string;
    start_info: FbPageStartInfo;
    store_location_descriptor: string;
    store_number: number;
    studio: string;
    supports_instant_articles: boolean;
    talking_about_count: number;
    unread_message_count: number;
    unread_notif_count: number;
    unseen_message_count: number;
    username: string;
    verification_status: string;
    voip_info: FbVoipInfo;
    website: string;
    were_here_count: number;
    written_by: string;
  }

  export interface FbVoipInfo {
    has_mobile_app: boolean;
    has_permission: boolean;
    is_callable: boolean;
    is_callable_webrtc: boolean;
    is_pushable: boolean;
    reason_code: number;
    reason_description: string;
  }

  export interface FbPageStartInfo {
    date: FbPageStartDate;
    type: string;
  }

  export interface FbPageStartDate {
    day: number;
    month: number;
    year: number;
  }

  // TODO check number vs bool (use API explorer)
  export interface FbPageRestaurantSpecialties {
    breakfast: number;
    coffee: number;
    dinner: number;
    drinks: number;
    lunch: number;
  }

  // TODO check number vs bool (use API explorer)
  export interface FbPageRestaurantServices {
    catering: number;
    delivery: number;
    groups: number;
    kids: number;
    outdoor: number;
    pickup: number;
    reserve: number;
    takeout: number;
    waiter: number;
    walkins: number;
  }

  /**
   * See:
   * https://developers.facebook.com/docs/marketing-api/targeting-specs/v2.8
   * https://github.com/facebook/facebook-php-ads-sdk/tree/master/src/FacebookAds/Object
   */
  export interface FbTargeting {
    // TODO impl: big complex object
  }

  // TODO check number vs bool (use API explorer)
  export interface FbPagePaymentOptions {
    amex: number;
    cash_only: number;
    discover: number;
    mastercard: number;
    visa: number;
  }

  // TODO check number vs bool (use API explorer)
  export interface FbPageParking {
    lot: number
    street: number
    valet: number
  }

  export interface FbVideo {
    backdated_time_granularity: string
    content_category: string
    created_time: FbDateTime
    description: string
    embed_html: string
    id: string
    backdated_time: FbDateTime
    content_tags: string[]
    embeddable: boolean
    event: FbEvent
    format: FbVideoFormat[]
    from: FbProfile
    icon: string
    is_crossposting_eligible: boolean
    is_instagram_eligible: boolean
    is_reference_only: boolean
    length: number
    live_status: string
    permalink_url: string
    picture: string
    place: FbPlace
    privacy: FbPrivacy
    published: boolean
    scheduled_publish_time: FbDateTime
    source: string
    status: FbVideoStatus
    title: string
    universal_video_id: string
    updated_time: FbDateTime
  }

  export interface FbLiveVideo {
    id: string
    broadcast_start_time: FbDateTime
    copyright: FbVideoCopyright
    creation_time: FbDateTime
    dash_preview_url: string
    description: string
    embed_html: string
    from: FbProfile
    is_manual_mode: boolean
    is_reference_only: boolean
    live_views: number
    motion_detection_settings: any // Undocumented type: MotionDetection
    permalink_url: string
    planned_start_time: FbDateTime
    preview_url: string
    seconds_left: number
    secure_stream_url: string
    status: string
    stream_url: string
    title: string
    video: FbVideo
  }

  export interface FbVideoCopyright {
    id: string
    copyright_content_id: string
    creator: FacebookUserModel
    monitoring_status: "NOT_EXAMED" | "COPYRIGHTED" | "ERROR"
    monitoring_type: string
    ownership_countries: string[]
    reference_owner_id: string
    rule_ids: FbVideoCopyrightRule[]
    whitelisted_ids: string[]
  }

  export interface FbVideoCopyrightRule {
    id: string
    condition_groups: any // Undocumented type: VideoCopyrightConditionGroup
    copyrights: string[]
    created_date: FbDateTime
    creator: FacebookUserModel
    name: string
  }

  export interface FbVideoList {
    id: string
    creation_time: FbDateTime
    description: string
    last_modified: FbDateTime
    owner: FacebookUserModel | FbPage
    title: string
  }

  export interface FbVideoStatus {
    processing_progress: number;
    video_status: FbVideoStatusEnum;
  }

  export interface FbVideoFormat {
    embed_html: string;
    filter: string;
    height: number;
    picture: string;
    width: number;
  }

  export interface FbEngagement {
    count: number;
    count_string: string;
    count_string_with_like: string;
    count_string_without_like: string;
    social_sentence: string;
    social_sentence_with_like: string;
    social_sentence_without_like: string;
  }

  export interface FbOpenGraphContext {
    id: string;
  }

  export interface FbMailingAddress {
    id: string;
    city: string;
    city_page: FbPage;
    country: string;
    postal_code: string;
    region: string;
    street1: string;
    street2: string;
  }

  export interface FbMediaFingerprint {
    id: string
    duration_in_sec: number
    fingerprint_content_type: string
    fingerprint_type: string
    metadata: any // Undocumented type: FingerprintMetadata
    title: string
    universal_content_id: string
  }

  export interface FbPageCategory {
    id: string;
    name: string;
  }

  export interface FbAppLinkHost {
    name: string;
    canonical_url: string;
    android: FbAndroidAppLink[];
    ios: FbIosAppLink[];
    ipad: FbIosAppLink[];
    iphone: FbIosAppLink[];
    web: FbWebAppLink;
    windows_phone: FbWindowsPhoneAppLink[];
  }

  export interface FbAppLinks {
    id: string;
    android: FbAndroidAppLink[];
    ios: FbIosAppLink[];
    ipad: FbIosAppLink[];
    iphone: FbIosAppLink[];
    web: FbWebAppLink;
    windows: FbWindowsAppLink[];
    windows_phone: FbWindowsPhoneAppLink[];
    windows_universal: FbWindowsAppLink[];
  }

  export interface FbWebAppLink {
    should_fallback: boolean;
    url: string;
  }

  export interface FbAndroidAppLink {
    app_name: string;
    class: string;
    package: string;
    url: string;
  }

  export interface FbIosAppLink {
    app_name: string;
    app_store_id: string;
    url: string;
  }

  export interface FbWindowsPhoneAppLink {
    app_id: string;
    app_name: string;
    url: string;
  }

  export interface FbWindowsAppLink {
    app_id: string;
    app_name: string;
    package_family_name: string;
    url: string;
  }

  export interface FbAdCampaign {
    // TODO impl
  }

  export interface FbApp {
    id: string
    an_platforms: string[]
    app_ad_debug_info: FbApplicationAppAdDebugInfo
    app_domains: string[]
    app_install_tracked: boolean
    app_name: string
    app_type: number
    auth_dialog_data_help_url: string
    auth_dialog_headline: string
    auth_dialog_perms_explanation: string
    auth_referral_default_activity_privacy: string
    auth_referral_enabled: number
    auth_referral_extended_perms: string[]
    auth_referral_friend_perms: string[]
    auth_referral_response_type: string
    auth_referral_user_perms: string[]
    canvas_fluid_height: boolean
    canvas_fluid_width: number
    canvas_url: string
    category: string
    client_config: Map<any, any>
    company: string
    configured_ios_sso: boolean
    contact_email: string
    context: FbApplicationContext
    created_time: FbDateTime
    creator_uid: string
    daily_active_users: string // numeric string
    daily_active_users_rank: number
    deauth_callback_url: string
    default_share_mode: string
    description: string
    hosting_url: string
    icon_url: string
    ios_bundle_id: string[]
    ios_supports_native_proxy_auth_flow: boolean
    ios_supports_system_auth: boolean
    ipad_app_store_id: string
    iphone_app_store_id: string
    link: string
    logging_token: string
    logo_url: string
    migrations: Map<string, boolean>
    mobile_profile_section_url: string
    mobile_web_url: string
    monthly_active_users: string // numeric string
    monthly_active_users_rank: number
    name: string
    namespace: string
    object_store_urls: FbApplicationObjectStoreUrls
    page_tab_default_name: string
    page_tab_url: string
    privacy_policy_url: string
    profile_section_url: string
    restrictions: FbApplicationRestrictionInfo
    secure_canvas_url: string
    secure_page_tab_url: string
    server_ip_whitelist: string
    social_discovery: number
    subcategory: string
    supported_platforms: FbAppSupportedPlatforms[]
    terms_of_service_url: string
    url_scheme_suffix: string
    user_support_email: string
    user_support_url: string
    website_url: string
    weekly_active_users: string // numeric string
  }

  export interface FbApplicationAppAdDebugInfo {
    android_installs_over_last_seven_days: number
    android_missing_settings: string[]
    android_support_status: string
    ios_install_invalidation_schemes: string[]
    ios_installs_over_last_seven_days: number
    ios_missing_settings: string[]
    ios_support_status: string
    is_app_child_app: boolean
    is_app_in_dev_mode: boolean
    is_cpa_enabled_for_android: boolean
    is_cpa_enabled_for_ios: boolean
    is_ocpm_enabled: boolean
    last_android_deferred_deep_link_call: FbDateTime
    last_android_install: FbDateTime
    last_ios_deferred_deep_link_call: FbDateTime
    last_ios_install: FbDateTime
  }

  export interface FbApplicationContext {
    id: string
  }

  export interface FbApplicationObjectStoreUrls {
    amazon_app_store: string
    fb_canvas: string
    google_play: string
    itunes: string
    itunes_ipad: string
    windows_10_store: string
  }

  export interface FbApplicationRestrictionInfo {
    age: string
    age_distribution: string
    location: string
    type: string
  }

  export interface FbRequest {
    id: string
    application: FbApp
    to: FacebookUserModel
    from: FacebookUserModel
    message: string
    created_time: FbDateTime
  }

  export interface FbPlace {
    id: string;
    location: FbLocation;
    name: string;
    overall_rating: number;
  }

  export interface FbPlaceTag {
    id: string
    created_time: FbDateTime
    place: FbPage
  }

  export interface FbPlaceTopic {
    id: string
    count: number
    has_children: boolean
    icon_url: string
    name: string
    parent_ids: string[]
    plural_name: string
    top_subtopic_names: string[]
  }

  /**
   * A cover photo for objects in the Graph API. Cover photos are used with Events, Groups,
   * Pages and People.
   */
  export interface FbCoverPhoto {

    /** The ID of the cover photo. */
    id: string

    /** When non-zero, the cover image overflows horizontally. The value indicates
     * the offset percentage of the total image width from the left [0-100].
     */
    offset_x: number

    /** When non-zero, the cover photo overflows vertically. The value indicates
     * the offset percentage of the total image height from the top [0-100].
     */
    offset_y: number

    /** Direct URL for the person's cover photo image. */
    source: string
  }

  export interface FbGroup {
    id: string;
    cover: FbCoverPhoto;
    description: string;
    email: string;
    icon: string;
    link: string;
    member_request_count: number;
    name: string;
    owner: FacebookUserModel | FbPage;
    parent: FbGroup | FbPage | FbApp;
    privacy: FbPrivacy;
    updated_time: FbDateTime;
  }

  export interface FbGroupDoc {
    id: string
    from: FacebookUserModel | FbPage
    subject: string
    message: string
    icon: string
    created_time: FbDateTime
    updated_time: FbDateTime
    revision: number
    can_edit: boolean
    can_delete: boolean
  }

  export interface FbInstagramComment {
    comment_type: "CAPTION" | "NORMAL" | "UNKNOWN"
    created_at: FbDateTime
    id: string
    instagram_comment_id: string
    instagram_user: FbInstagramUser
    mentioned_instagram_users: FbInstagramUser[]
    message: string
  }

  export interface FbInstagramUser {
    id: string
    follow_count: number
    followed_by_count: number
    has_profile_picture: boolean
    is_private: boolean
    media_count: number
    profile_pic: string
    username: string
  }

  export interface FbLifeEvent {
    created_time: FbDateTime
    description: string
    end_time: FbDateTime
    from: FbPage
    id: string
    is_hidden: boolean
    start_time: FbDateTime
    title: string
    updated_time: FbDateTime
  }

  /** Location node used with other objects in the Graph API. */
  export interface FbLocation {
    city: string;
    city_id: number;
    country: string;
    country_code: string;
    latitude: number;
    located_in: string;
    longitude: number;
    name: string;
    region: string;
    region_id: number;
    state: string;
    street: string;
    zip: string;
  }

  export interface FbEventOwner {
    id: string;
    name: string;
  }

  export interface FbEvent {
    id: string;
    //category: enum // TODO Resolve enum.
    cover: FbCoverPhoto;
    description: string;
    //type: enum; // TODO Resolve enum.
    end_time: FbDateTime;
    is_viewer_admin: boolean;
    is_page_owned: boolean;
    can_guests_invite: boolean;
    guest_list_enabled: boolean;
    name: string;
    owner: FbEventOwner;
    parent_group: FbGroup;
    place: FbPlace;
    start_time: FbDateTime;
    ticket_uri: string;
    //timezone: enum; // TODO Resolve
    updated_time: FbDateTime;
    attending_count: number;
    declined_count: number;
    maybe_count: number;
    noreply_count: number;
    interested_count: number;
  }

  /** An individual unread Facebook notification */
  export interface FbNotification {
    id: string;
    from: FacebookUserModel | FbPage | FbApp;
    to: FacebookUserModel;
    created_time: FbDateTime;
    updated_time: FbDateTime;
    title: string;
    link: string;
    application: FbApp;
    unread: number;
    object: any;
  }

  export interface FbAchievement {
    id: string
    from: FacebookUserModel
    publish_time: FbDateTime
    application: FbApp
    data: FbAchievementData
    type: "games.achievement" // FB doc says the value always is "games.achievement"
    no_feed_story: boolean
  }

  export interface FbAchievementData {
    achievement: FbAchievementType
    importance: number
  }

  export interface FbAchievementType {
    id: string
    type: "games.achievement" // FB doc says the value always is "games.achievement"
    title: string
    url: string
    description: string
    image: FbAchievementTypeImage
    data: FbAchievementTypeData
    updated_time: FbDateTime
    created_time: FbDateTime
    application: FbApp
    context: any[] // Unclear from docs: array containing the 'display_order'
    is_scraped: boolean
  }

  export interface FbAchievementTypeImage {
    url: string
    width: number
    height: number
  }

  export interface FbAchievementTypeData {
    points: number
  }

  export interface FbAlbum {
    id: string;
    can_upload: boolean;
    count: number;
    cover_photo: FbPhoto;
    created_time: FbDateTime;
    description: string;
    event: FbEvent;
    from: FacebookUserModel;
    link: string;
    location: string;
    name: string;
    place: FbPage;
    privacy: string;
    type: FbAlbumType;
    updated_time: FbDateTime;
  }

  /** Represents an individual photo on Facebook. */
  export interface FbPhoto {
    id: string;
    album: FbAlbum;
    backdated_time: FbDateTime;
    backdated_time_granularity: any;
    can_backdate: boolean;
    can_delete: boolean;
    can_tag: boolean;
    created_time: FbDateTime;
    event: FbEvent;
    from: FacebookUserModel | FbPage;
    height: number;
    icon: string;
    images: FbPlatformImageSource[];
    link: string;
    name: string;
    name_tags: FbEntityAtTextRange[];
    page_story_id: string;
    picture: string;
    place: FbPlace;
    target: FbProfile;
    updated_time: FbDateTime;
    webp_images: FbPlatformImageSource[];
    width: number;
  }

  export interface FbPlatformImageSource {
    height: number;
    source: string;
    width: number;
  }

  export interface FbEntityAtTextRange {
    id: string;
    length: number;
    name: string;
    object: FbProfile;
    offset: number;
    type: FbEntityAtTextRangeType;
  }

  export interface FbPromotionInfo {
    budget: number
    currency: string
    spent: number
  }

  export interface FbSavedMessageResponse {
    id: string
    category: string
    image: string
    is_enabled: boolean
    message: string
    title: string
  }

  export interface FbPost {
    id: string
    admin_creator: FbPostAdminCreator
    application: FbApp
    call_to_action: {
      context: Object
    }
    caption: string
    created_time: FbDateTime
    description: string
    feed_targeting: FbPostFeedTargeting
    from: FbProfile
    icon: string
    instagram_eligibility: string
    is_hidden: boolean
    is_instagram_eligible: string | boolean // Maybe typo in docs? Looks like it should be 'boolean'.
    is_published: boolean
    link: string
    message: string
    message_tags: any // Unclear
    name: string
    object_id: string
    parent_id: string
    permalink_url: string
    picture: string
    place: FbPlace
    privacy: FbPostPrivacy
    properties: FbPostProperty[]
    shares: any | number // Unclear: object
    source: string
    status_type: FbPostStatusType
    story: string
    targeting: FbPostTargeting
    to: FbProfile[]
    type: FbPostType
    updated_time: FbDateTime
    with_tags: Object
  }

  export type FbPostType = "link" | "status" | "photo" | "video" | "offer";

  export interface FbPostFeedTargeting {
    age_max: number
    age_min: number
    cities: number[]
    college_years: number[]
    countries: string[]
    education_statuses: number[]
    genders: number[]
    interested_in: number[]
    interests: number[]
    locales: number[]
    regions: number[]
    relationship_statuses: number[]
  }

  export interface FbPostTargeting {
    countries: string[]
    locales: number[]
    regions: number[]
    cities: number[]
  }

  export type FbPostStatusType =
    "mobile_status_update" | "created_note" | "added_photos" | "added_video" | "shared_story" |
      "created_group" | "created_event" | "wall_post" | "app_created_story" | "published_story" |
      "tagged_in_photo" | "approved_friend"
    ;

  export interface FbPostProperty {
    name: string
    text: string
    href: string
  }

  export interface FbPostPrivacy {
    description: string
    value: "EVERYONE" | "ALL_FRIENDS" | "FRIENDS_OF_FRIENDS" | "SELF" | "CUSTOM"
    friends: "ALL_FRIENDS" | "FRIENDS_OF_FRIENDS" | "SOME_FRIENDS"
    allow: any | string // Unclear: csv<string>
    deny: any | string // Unclear: csv<string>
  }

  export interface FbPostAdminCreator {
    id: string
    name: string
  }

  export interface FbComment {
    id: string
    attachment: FbStoryAttachment
    can_comment: boolean
    can_remove: boolean
    can_hide: boolean
    can_like: boolean
    can_reply_privately: boolean
    comment_count: number
    created_time: FbDateTime
    from: FacebookUserModel
    like_count: number
    message: string
    message_tags: FbCommentMessageTag[]
    object?: Object
    parent: FbComment
    private_reply_conversation: FbConversation
    user_likes: boolean
  }

  export interface FbCommentMessageTag {
    id: string
    name: string
    type: "user" | "page" | "group"
    offset: number
    length: number
  }

  export interface FbStoryAttachment {
    description: string
    description_tags: FbEntityAtTextRange[]
    media: FbStoryAttachmentMedia
    target: FbStoryAttachmentTarget
    title: String
    type: String
    url: String
  }

  export interface FbStoryAttachmentMedia {
    image: any // Undocumented type: ImageSource
  }

  export interface FbStoryAttachmentTarget {
    id: string
    url: string
  }

  export interface FbConversation {
    id: string
    snippet: string
    updated_time: FbDateTime
    message_count: number
    unread_count: number
    tags: Set<FbConversationTag>
    participants: (FacebookUserModel | FbPage)[]
    senders: FacebookUserModel[]
    can_reply: boolean
    is_subscribed: boolean
  }

  export interface FbConversationTag {
    name: string
  }

  export interface FbMessage {
    created_time: FbDateTime
    from: FbProfile
    id: string
    message: string
    subject: string
    tags: Object[]
    to: FbProfile[]
  }

  export interface FbMilestone {
    id: string
    title: string
    from: FbPage
    description: string
    created_time: FbDateTime
    updated_time: FbDateTime
    start_time: FbDateTime
    end_time: FbDateTime
  }

  export interface FbNativeOffer {
    id: string
    barcode_photo: string
    barcode_photo_uri: string
    barcode_type: string
    barcode_value: string
    details: string
    disable_location: boolean
    discounts: any[] // Undocumented type: NativeOfferDiscount
    expiration_time: FbDateTime
    instore_code: string
    location_type: "online" | " offline" | " both"
    max_save_count: number
    online_code: string
    page: FbPage
    redemption_link: string
    save_count: number
    terms: string
    title: string
    total_unique_codes: string
    unique_codes: string
    unique_codes_file_code_type: string
    unique_codes_file_name: string
    unique_codes_file_upload_status: string
  }

  export interface FbObjectLikes {
    total_count: number
  }

  export interface FbDebugToken {
    input_token: string
  }

  export interface FbDoc {
    id: string
    can_delete: boolean
    can_edit: boolean
    created_time: FbDateTime
    from: FacebookUserModel
    icon: string
    link: string
    message: string
    revision: any // It's unclear: string or number?
    subject: string
    updated_time: FbDateTime
  }

  export interface FbDomain {
    id: string
    name: string
  }

  export interface FbFriendList {
    id: string
    list_type: string
    name: string
    owner: string
  }

  export interface FbStatus {
    id: string
    event: FbEvent
    from: FbProfile
    message: string
    place: FbPage
    updated_time: FbDateTime
  }

  export interface FbTestUser {
    name: string
    password: string
  }

  export interface FbUrl {
    id: string
    og_object: FbUrlOgObject;
    app_links: FbAppLinks;
    share: FbUrlShare
  }

  export interface FbUrlShare {
    comment_count: number
    share_count: number
  }

  export interface FbUrlOgObject {
    id: string
    description: string
    engagement: FbUrlEngagement
    title: string
    type: string
    updated_time: FbDateTime
    url: string
  }

  export interface FbUrlEngagement {
    count: number
    social_sentence: string
  }
// }

// export default FbGraphApi;
