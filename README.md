# Bihar Studio – Meta pixel test site

A small static website for testing the Meta pixel **29021832257441205**.

## Events it sends

| Where | Event |
|---|---|
| Every page (base code in `<head>`) | PageView |
| Opening `services.html` | ViewContent |
| "Book a visit" button on Services | Schedule |
| "Call us" links | Contact |
| Submitting the form on `contact.html` (opens `thank-you.html`) | Lead |

The black **Pixel events** button at the bottom right lists what each page sent, and says if an ad blocker stopped the pixel.

## Host it on GitHub Pages

1. Create a new **public** repository on GitHub, e.g. `bihar-studio`.
2. Upload all files from this folder to the repository root (keep the `css` and `js` folders and `.nojekyll`).
3. In the repository, open **Settings → Pages**. Under "Build and deployment" choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After about a minute the site is live at `https://<your-username>.github.io/bihar-studio/`.

## Test the pixel

1. Turn off any ad blocker for the site.
2. Open the site, visit Services, click "Book a visit", then submit the contact form.
3. In Reppoo: **Pixels Enhance → Bihar Studio pixel → Check again**. The status should change to Active and the events should appear under Recent activity (allow a few minutes).

To use your own pixel, replace `29021832257441205` in the four HTML files (2 places each).
