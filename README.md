# Saffron Café & Kitchen – tracking test site

A small static restaurant & café website for testing the Meta pixel **29021832257441205**, Google Analytics **G-R2PZ32QTNS** and Google Tag Manager **GTM-NVT9N6S4**.

## Pages

| Page | What's on it |
|---|---|
| `index.html` | Home: intro, opening hours, call and reserve buttons |
| `menu.html` | Set menus with "Reserve a table" buttons, full menu with prices |
| `contact.html` | Table reservation form (test only: nothing is sent or stored) |
| `thank-you.html` | Shown after the form is submitted |

## Events it sends

| Where | Meta pixel | Google Analytics |
|---|---|---|
| Every page (base code in `<head>`) | PageView | page_view |
| Opening `menu.html` | ViewContent | – |
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

To use your own pixel, replace `29021832257441205` in the four HTML files (2 places each).
