# Image credits

Stock photography was researched beginning with [Pexels semi-truck photos](https://www.pexels.com/search/semi-truck/), downloaded from the original image CDN, visually inspected, and optimized locally on 2026-09-10. The website uses four distinct photographs. The mobile hero is an alternate crop of the desktop hero.

These are illustrative stock photographs of North American trucking. They do not depict or identify Utopia-owned vehicles, facilities, or employees, and must not be captioned as the company's fleet. No prominent competitor branding appears in the chosen web crops.

| Local file                              | Photographer    | Source page                                                                                                                                        | Original download                                                                     | Treatment                                                                                                                       |
| --------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/hero-truck.webp`         | 500photos.com   | [Semi-truck beneath snow-capped mountains, Pexels 93398](https://www.pexels.com/photo/white-dump-truck-near-pine-tress-during-daytime-93398/)      | [Original JPEG](https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)       | Landscape crop; 1920 px wide; WebP quality 82                                                                                   |
| `public/images/hero-truck-mobile.webp`  | 500photos.com   | [Pexels 93398](https://www.pexels.com/photo/white-dump-truck-near-pine-tress-during-daytime-93398/)                                                | [Original JPEG](https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)       | Right-side portrait crop keeping the tractor visible; 900 × 1200; WebP quality 80                                               |
| `public/images/freight-road.webp`       | Quintin Gellar  | [Red truck in Nevada, Pexels 6563903](https://www.pexels.com/sk-sk/photo/vozidlo-pohlad-vyhlad-usa-6563903/)                                       | [Original JPEG](https://images.pexels.com/photos/6563903/pexels-photo-6563903.jpeg)   | Original proportions; 1200 px wide; WebP quality 82                                                                             |
| `public/images/trucking-detail.webp`    | Braeson Holland | [A truck on the road in Jaffray, British Columbia, Pexels 8994766](https://www.pexels.com/photo/a-truck-on-the-road-8994766/)                      | [Original JPEG](https://images.pexels.com/photos/8994766/pexels-photo-8994766.jpeg)   | Crop emphasizing tractor and forest; 1100 × 880; WebP quality 82                                                                |
| `public/images/palletised-freight.webp` | Caleb Oquendo   | [Forklift operators loading pallets on truck, Pexels 34585120](https://www.pexels.com/photo/forklift-operators-loading-pallets-on-truck-34585120/) | [Original JPEG](https://images.pexels.com/photos/34585120/pexels-photo-34585120.jpeg) | Right-side crop from the 5442 × 3628 original that **removes the carrier branding on the trailer**; 1200 × 774; WebP quality 82 |

## Licence

All selected photographs are supplied under the [Pexels License](https://www.pexels.com/license/), verified on the individual source pages and the Pexels licence page on 2026-09-10. Pexels permits free website and commercial use, modification, and cropping; attribution is optional. Restrictions include implying endorsement, selling unaltered copies, redistributing photographs as stock, and incorporating the photographs into a trademark. The use here is illustrative website photography with credit recorded above.

## Candidate review

- Pexels 6563903, explicitly provided in the brief: inspected and selected as the supporting road photograph. Used for the Full Truckload (FTL) service.
- Pexels 34585120: downloaded and inspected for the Less Than Truckload (LTL) service, which needed palletised freight rather than another highway tractor. The full frame shows **The Bean Team Transport, Inc.** lettering along the trailer, so the published crop starts to the right of that lettering and no carrier branding remains. The exported crop was inspected visually before it was added.
- Pexels 27099095: downloaded and inspected as an alternative FTL photograph, then rejected as too similar in subject and setting to the existing `freight-road.webp`. It is not included in `public/images`.
- [Pexels 27508769 original](https://images.pexels.com/photos/27508769/pexels-photo-27508769.jpeg), explicitly provided in the brief: downloaded and inspected, then rejected because the tractor has prominent **PRIME inc.** branding. It is not included in `public/images` or the website.

## Suggested accessible descriptions

- Hero: “A white tractor-trailer travels along a highway beneath snow-capped mountains.” Use an empty `alt` if the hero is implemented as decorative imagery behind the headline.
- Palletised freight: “A forklift carries a shrink-wrapped pallet of boxed goods beside an open trailer.” The people shown are the photographer’s subjects, not Utopia employees.
- Freight road: “A red tractor-trailer travels through a desert landscape in Nevada.”
- Trucking detail: “A white semi-truck travels on a forest-lined highway in British Columbia.”

For the landscape hero, keep `object-position: center bottom` when using a shallower container so the truck remains visible. The mobile file is already cropped for portrait presentation.
