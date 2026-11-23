# Saffron Café & Kitchen – tracking test site

A small static restaurant & café website for testing the Meta pixel **29021832257441205**, Google Analytics **G-R2PZ32QTNS** and Google Tag Manager **GTM-NVT9N6S4**.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | Home: intro, opening hours, FAQ, call and reserve buttons |
| `menu-patna.html` | Set menus with "Reserve a table" buttons, full menu with prices, menu FAQ |
| `table-booking.html` | Table reservation form (test only: nothing is sent or stored) |
| `home-delivery.html` | Order online (Zomato, Swiggy) or by phone |
| `contact-patna.html` | Contact details, private dining, map |
| `about.html` | Our story: the kitchen and the coffee |
| `blog.html` | Two blog posts with an FAQ |
| `thank-you.html` | Shown after the form is submitted (not indexed) |
| `menu.html`, `contact.html` | Old addresses: they forward to `menu-patna.html` and `table-booking.html` |

The Google, Tag Manager and Meta libraries load on the first tap, scroll or key press, or 3.5 s after the page has loaded (straight away on the thank-you page), so they don't slow down the first view. Events sent before that wait in a queue and go out when the libraries arrive.

## Events it sends

| Where | Meta pixel | Google Analytics |
|---|---|---|
| Every page (base code in `<head>`) | PageView | page_view |
| Opening `menu-patna.html` | ViewContent | – |
| "Reserve a table" buttons on the menu | Schedule | – |
| "Call us" links | Contact | – |
| Submitting the reservation form (opens `thank-you.html`) | Lead | generate_lead, with `service` = Breakfast & coffee / Lunch / Dinner / Private party |

The black **Pixel events** button at the bottom right lists what each page sent, and says if an ad blocker stopped the pixel.

## Host it on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `saffron-cafe`.
2. Upload all files from this folder to the repository root (keep the `css` and `js` folders).
3. In the repository, open **Settings → Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/saffron-cafe/`.

## Test the pixel

1. Turn off any ad blocker for the site.
2. Open the site, visit the Menu, click "Reserve a table", then submit the reservation form.
3. In Reppoo: **Pixels Enhance → pixel → Check again**. The status should change to Active and the events should appear under Recent activity (allow a few minutes).

To use your own pixel, replace `29021832257441205` in each page's `<head>` (2 places per page).
