// ---------------------------------------------------------
// 🛠️ LETGO DETAIL HARVESTER & CLEANER SCRIPT
// ---------------------------------------------------------
// Talimatlar:
// 1. Projenizdeki `web-dashboard/public/verified_data.json` dosyasının içeriğini kopyalayın.
// 2. Aşağıdaki `const RAW_DATA = [...]` kısmındaki parantezlerin içine yapıştırın.
// 3. Bu kodun tamamını kopyalayıp letgo.com'da Console sekmesine yapıştırın ve Enter'a basın.
// ---------------------------------------------------------

// 👇 BURAYA VERİYİ YAPIŞTIRIN 👇
const RAW_DATA = [
	{
		"id": "1691638903",
		"title": "hal\u0131 kilim 80/130 cm\n",
		"price": "100 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/63f51d6be0f24-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-kilim-80130-cm-iid-1691638903",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9867768883705139
	},
	{
		"id": "1711578534",
		"title": "antika kilim hal\u0131\n",
		"price": "10 TL",
		"location": "\u0130stanbul, G\u00fcng\u00f6ren",
		"image": "https://imvm.letgo.com/v1/files/8409d19ce1944-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/antika-kilim-hal-iid-1711578534",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9815124273300171
	},
	{
		"id": "1711152353",
		"title": "hal\u0131\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/8796be2806444-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-iid-1711152353",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9765992760658264
	},
	{
		"id": "1711715187",
		"title": "hal\u0131\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/4acb2091cad74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-iid-1711715187",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.972614586353302
	},
	{
		"id": "1695702400",
		"title": "Merinos hal\u0131 4 m\u00b2\n",
		"price": "150 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/2183b78bcec44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/merinos-hal-4-m-iid-1695702400",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9292764067649841
	},
	{
		"id": "1723713674",
		"title": "Hal\u0131-kilim\n",
		"price": "250 TL",
		"location": "\u0130stanbul, \u00c7ekmek\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/bef94b64b5924-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-kilim-iid-1723713674",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9959841966629028
	},
	{
		"id": "1723737181",
		"title": "Her t\u00fcrl\u00fc el dokuma hal\u0131 kilim yoluk yast\u0131k \u0131sparta k\u00f6y hal\u0131s\u0131 al\u0131n\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, G\u00fcng\u00f6ren",
		"image": "https://imvm.letgo.com/v1/files/99d528dfd4544-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/her-turlu-el-dokuma-hal-kilim-yoluk-yastk-sparta-koy-hals-alnr-iid-1723737181",
		"scrapedAt": "2026-01-25T10:15:47.896Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.992536187171936
	},
	{
		"id": "1719040828",
		"title": "hal\u0131\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/600f5746d2a44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-iid-1719040828",
		"scrapedAt": "2026-01-25T10:15:47.897Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9898404479026794
	},
	{
		"id": "1703726312",
		"title": "Kilim\n",
		"price": "120 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/6b6232ba5c5c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kilim-iid-1703726312",
		"scrapedAt": "2026-01-25T10:15:47.897Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.8963257670402527
	},
	{
		"id": "1721816620",
		"title": "Hal\u0131\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/0df11e776a084-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-iid-1721816620",
		"scrapedAt": "2026-01-25T10:15:47.897Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9496766924858093
	},
	{
		"id": "1719041719",
		"title": "biriland yolluk\n",
		"price": "150 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/22f477c7b9a64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/biriland-yolluk-iid-1719041719",
		"scrapedAt": "2026-01-25T10:15:47.897Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9956165552139282
	},
	{
		"id": "1723433149",
		"title": "\u0130kinci el 27 metrekare cim hal\u0131 fuar alan\u0131nda sergilendi temiz herh\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/2cd3b71b00c74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ikinci-el-27-metrekare-cim-hal-fuar-alannda-sergilendi-temiz-herh-iid-1723433149",
		"scrapedAt": "2026-01-25T10:15:47.897Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9610543251037598
	},
	{
		"id": "1723231184",
		"title": "Modern \u00c7i\u00e7ek Desenli Siyah \u00c7er\u00e7eveli Hal\u0131 | Kaymaz Taban | Salon\n",
		"price": "22 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/d66a5ead20584-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-cicek-desenli-siyah-cerceveli-hal-kaymaz-taban-salon-iid-1723231184",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.8945150375366211
	},
	{
		"id": "1723233208",
		"title": "Modern Gri Mermer Desenli Hal\u0131 | Dijital Bask\u0131 | Kaymaz Taban | Salon\n",
		"price": "22 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/3087c06fcd674-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-gri-mermer-desenli-hal-dijital-bask-kaymaz-taban-salon-iid-1723233208",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9774532914161682
	},
	{
		"id": "1723229683",
		"title": "Etnik Desenli Hal\u0131 | Kaymaz Taban | Bohem ve Do\u011fal Dekorasyon \u0130\u00e7in Mod\n",
		"price": "55 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f2fd9eebc4e54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/etnik-desenli-hal-kaymaz-taban-bohem-ve-dogal-dekorasyon-icin-mod-iid-1723229683",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9624296426773071
	},
	{
		"id": "1723230858",
		"title": "Modern Siyah \u00c7er\u00e7eveli Hal\u0131 | Kaymaz Taban | Salon ve Antre \u0130\u00e7in Minim\n",
		"price": "65 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/eebffa7d24af4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-siyah-cerceveli-hal-kaymaz-taban-salon-ve-antre-icin-minim-iid-1723230858",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9815964102745056
	},
	{
		"id": "1723233053",
		"title": "Modern \u00c7er\u00e7eveli Krem Hal\u0131 | Dijital Bask\u0131 | Kaymaz Taban | Salon ve A\n",
		"price": "22 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/c798c674b9254-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-cerceveli-krem-hal-dijital-bask-kaymaz-taban-salon-ve-a-iid-1723233053",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9814737439155579
	},
	{
		"id": "1723230658",
		"title": "Vintage Klasik Desenli A\u00e7\u0131k Renk Hal\u0131 | Kaymaz Taban | Salon ve Antre\n",
		"price": "6 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/53ee7771091f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/vintage-klasik-desenli-ack-renk-hal-kaymaz-taban-salon-ve-antre-iid-1723230658",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9757070541381836
	},
	{
		"id": "1723232892",
		"title": "Modern Patchwork Desenli Gri Hal\u0131 | Kaymaz Taban | Salon ve Ofis \u0130\u00e7in\n",
		"price": "22 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/faf52e5fe72d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-patchwork-desenli-gri-hal-kaymaz-taban-salon-ve-ofis-icin-iid-1723232892",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9661450982093811
	},
	{
		"id": "1723232722",
		"title": "Modern Nokta Desenli Siyah Gri Hal\u0131 | Kaymaz Taban | Minimal ve \u015e\u0131k Sa\n",
		"price": "32 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/8258fc172e804-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-nokta-desenli-siyah-gri-hal-kaymaz-taban-minimal-ve-sk-sa-iid-1723232722",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9931203126907349
	},
	{
		"id": "1723230445",
		"title": "Klasik Saray Desenli Hal\u0131 | Kaymaz Taban | Salon ve Oturma Odas\u0131 \u0130\u00e7in\n",
		"price": "65 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/83a781b525a94-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/klasik-saray-desenli-hal-kaymaz-taban-salon-ve-oturma-odas-icin-iid-1723230445",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9898401498794556
	},
	{
		"id": "1723230291",
		"title": "Etnik Desenli Modern Hal\u0131 | Kaymaz Taban | Antre ve Salon \u0130\u00e7in \u015e\u0131k Tas\n",
		"price": "65 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/fee2e33a044c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/etnik-desenli-modern-hal-kaymaz-taban-antre-ve-salon-icin-sk-tas-iid-1723230291",
		"scrapedAt": "2026-01-25T10:15:47.898Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9871798157691956
	},
	{
		"id": "1715209173",
		"title": "hal\u0131 kilim\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/b317ca980c0a4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-kilim-iid-1715209173",
		"scrapedAt": "2026-01-25T10:15:47.899Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9164947867393494
	},
	{
		"id": "1715209407",
		"title": "hal\u0131 kilim\n",
		"price": "150 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/060bcd60b9bb4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-kilim-iid-1715209407",
		"scrapedAt": "2026-01-25T10:15:47.899Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9843149781227112
	},
	{
		"id": "1715329825",
		"title": "oval y\u0131kanabilir hal\u0131\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/911a0008e1824-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/oval-ykanabilir-hal-iid-1715329825",
		"scrapedAt": "2026-01-25T10:15:47.899Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.8656260371208191
	},
	{
		"id": "1722357259",
		"title": "2 adet hal\u0131\n",
		"price": "250 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/08e1bf65b18b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/2-adet-hal-iid-1722357259",
		"scrapedAt": "2026-01-25T10:15:47.899Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9915497303009033
	},
	{
		"id": "1714573324",
		"title": "Krem - Uzun Hal\u0131 Kilim 73x295cm\n",
		"price": "240 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/08ad3f68e23f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/krem---uzun-hal-kilim-73x295cm-iid-1714573324",
		"scrapedAt": "2026-01-25T10:15:47.899Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9959348440170288
	},
	{
		"id": "1722810766",
		"title": "hal\u0131 \u00f6rt\u00fcs\u00fc en 188 boy 282 cm\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/e48cf2abf4d84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hal-ortusu-en-188-boy-282-cm-iid-1722810766",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9787036776542664
	},
	{
		"id": "1699440035",
		"title": "YOLLUK ve HALI MODELLER\u0130 \u274cKARGO BEDAVA \u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\u2714\ufe0f\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/8f045b4136b54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yolluk-ve-hali-modelleri-kargo-bedava-iid-1699440035",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.875765860080719
	},
	{
		"id": "1723228473",
		"title": "Modern \u00c7izgili \u00c7er\u00e7eveli Hal\u0131 | Kaymaz Taban | \u00d6zel \u00d6l\u00e7\u00fc Salon ve Kori\n",
		"price": "12 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/952c33a8d2f14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-cizgili-cerceveli-hal-kaymaz-taban-ozel-olcu-salon-ve-kori-iid-1723228473",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9918761253356934
	},
	{
		"id": "1723044811",
		"title": "kilim hal\u0131\n",
		"price": "150 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/2ba2a263d4f84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kilim-hal-iid-1723044811",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.8902009129524231
	},
	{
		"id": "1723229901",
		"title": "Klasik Desenli Hal\u0131 | Kaymaz Taban | Salon ve Antre \u0130\u00e7in \u015e\u0131k Gelenekse\n",
		"price": "65 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/048a77a6ffac4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/klasik-desenli-hal-kaymaz-taban-salon-ve-antre-icin-sk-gelenekse-iid-1723229901",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9898557662963867
	},
	{
		"id": "1723230077",
		"title": "Modern Geometrik Desenli Hal\u0131 | Kaymaz Taban | Salon ve Antre \u0130\u00e7in \u015e\u0131k\n",
		"price": "65 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/08c7ee447f4c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/modern-geometrik-desenli-hal-kaymaz-taban-salon-ve-antre-icin-sk-iid-1723230077",
		"scrapedAt": "2026-01-25T10:15:47.900Z",
		"verified_agent": "AGENT_08_RUGS",
		"confidence_score": 0.9675250053405762
	},
	{
		"id": "1723322813",
		"title": "lokanta d\u0131\u015f mekan masa ve sandelye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/47e6bc4390934-OLXAUTOTR/image;s=1024x1024",
		"link": "https://www.letgo.com/item/lokanta-ds-mekan-masa-ve-sandelye-iid-1723322813",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9664942026138306
	},
	{
		"id": "1723870723",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/060f752cfe944-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1723870723",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9986467957496643
	},
	{
		"id": "1723863733",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f39b6e4ef6ef4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1723863733",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9736488461494446
	},
	{
		"id": "1723722702",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/bd53a483e0f04-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1723722702",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9975849390029907
	},
	{
		"id": "1723723291",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/cdd1c1d824734-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1723723291",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9567952752113342
	},
	{
		"id": "1720555992",
		"title": "okey masa sandalye tak\u0131m\u0131 imalattan\n",
		"price": "11 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f67d05c13bf04-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/okey-masa-sandalye-takm-imalattan-iid-1720555992",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.974939227104187
	},
	{
		"id": "1719322125",
		"title": "masa sandalye imalattan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/253f81e50bc64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-iid-1719322125",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9873881936073303
	},
	{
		"id": "1719322157",
		"title": "masa sandalye imalattan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/26780786eb924-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-iid-1719322157",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9973587393760681
	},
	{
		"id": "1719322082",
		"title": "masa sandalye imalattan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/2a9a81a7a2964-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-iid-1719322082",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.978890061378479
	},
	{
		"id": "1719322226",
		"title": "masa sandalye imalattan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/85e5bc46dfd14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-iid-1719322226",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9928281903266907
	},
	{
		"id": "1719322193",
		"title": "masa sandalye imalattan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/ecb3552d57144-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-iid-1719322193",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9761636853218079
	},
	{
		"id": "1719322262",
		"title": "masa sandalye imalattan renk se\u00e7enekleri mevcut\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/e1d520b248274-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-imalattan-renk-secenekleri-mevcut-iid-1719322262",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9962610602378845
	},
	{
		"id": "1715669261",
		"title": "Ah\u015fap masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/eeac43eb94004-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ahsap-masa-sandalye-takm-iid-1715669261",
		"scrapedAt": "2026-01-25T10:15:43.111Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9989670515060425
	},
	{
		"id": "1721346984",
		"title": "\u0130MALATTAN MASA SANDALYE TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/9200338a618e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-masa-sandalye-takimi-iid-1721346984",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.983808696269989
	},
	{
		"id": "1721345495",
		"title": "\u0130MALATTAN SALON MASA SANDALYE\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/322e389f73bb4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-salon-masa-sandalye-iid-1721345495",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9814673066139221
	},
	{
		"id": "1721345597",
		"title": "\u0130MALATTAN BOHEM MASA SANDALYE\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/dc74d6ccf72e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-bohem-masa-sandalye-iid-1721345597",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9962378740310669
	},
	{
		"id": "1720733974",
		"title": "Cafe Masa ve Sandalye Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/b797328e81794-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cafe-masa-ve-sandalye-takm-iid-1720733974",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9304603338241577
	},
	{
		"id": "1721345384",
		"title": "\u0130MALATTAN CAFE RESTAURANT MASA SANDALYE\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/1254dbb275e54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-cafe-restaurant-masa-sandalye-iid-1721345384",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9895841479301453
	},
	{
		"id": "1682713188",
		"title": "Kafe b\u00fcfe masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/0a73ebdfc6f64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kafe-bufe-masa-sandalye-iid-1682713188",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9782029986381531
	},
	{
		"id": "1698440289",
		"title": "cafe masa sandalye toptan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/46617db93b724-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cafe-masa-sandalye-toptan-iid-1698440289",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9650676250457764
	},
	{
		"id": "1722498037",
		"title": "ah\u015fap masa sandalye sedir k\u00f6\u015fe tak\u0131m\u0131\n",
		"price": "5 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/ea6179b92b524-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ahsap-masa-sandalye-sedir-kose-takm-iid-1722498037",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9548234343528748
	},
	{
		"id": "1718925668",
		"title": "koltuk masa sandalye\n",
		"price": "5 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/dc19abfc40594-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-masa-sandalye-iid-1718925668",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9824472069740295
	},
	{
		"id": "1723641966",
		"title": "6 sandalye, 1 masa, tv konsolu (ihtiya\u00e7 sahibine \u00fccretsiz)\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/1960161af8a74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/6-sandalye-1-masa-tv-konsolu-ihtiyac-sahibine-ucretsiz-iid-1723641966",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9477458000183105
	},
	{
		"id": "1686489533",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/81255fe08df64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1686489533",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.8937991261482239
	},
	{
		"id": "1686491508",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/9bc3d5303d854-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1686491508",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9989369511604309
	},
	{
		"id": "1709771177",
		"title": "masa sandalye\n",
		"price": "3 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/6ac7c671f6b34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1709771177",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9351270794868469
	},
	{
		"id": "1709548841",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f142b25313254-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1709548841",
		"scrapedAt": "2026-01-25T10:15:43.112Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9943021535873413
	},
	{
		"id": "1708888827",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/cdf7c22b14314-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1708888827",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9914618730545044
	},
	{
		"id": "1675964792",
		"title": "Masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/f57f777c762e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1675964792",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9908102750778198
	},
	{
		"id": "1682800223",
		"title": "Masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/a113790331344-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1682800223",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.8995295763015747
	},
	{
		"id": "1712560143",
		"title": "MASA SANDALYE YEMEK TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/4dad74adbaa44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-yemek-takimi-iid-1712560143",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9951385259628296
	},
	{
		"id": "1686491728",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/577966f3e3a34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1686491728",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9978954792022705
	},
	{
		"id": "1686491569",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/c1a94abb377d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1686491569",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9976656436920166
	},
	{
		"id": "1720989604",
		"title": "S\u0131f\u0131r masa sandalye tak\u0131m\u0131\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/9fd66be869ab4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-masa-sandalye-takm-iid-1720989604",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9990829229354858
	},
	{
		"id": "1722247012",
		"title": "masa takimi K\u00f6rfez masa sandalye\n",
		"price": "42 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/b599601bdc764-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-takimi-korfez-masa-sandalye-iid-1722247012",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9963870048522949
	},
	{
		"id": "1656253037",
		"title": "Masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/b9nif4l7bdsh-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-takm-iid-1656253037",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9871066212654114
	},
	{
		"id": "1703002278",
		"title": "sa\u011flam Bar tarz\u0131 masa sandalye\n",
		"price": "1 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/3615322280834-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/saglam-bar-tarz-masa-sandalye-iid-1703002278",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9764382243156433
	},
	{
		"id": "1716215162",
		"title": "plastik masa sandalye\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/1d24c8513ae44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/plastik-masa-sandalye-iid-1716215162",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9658682346343994
	},
	{
		"id": "1708070714",
		"title": "masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/7bb9c9d68a194-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-takm-iid-1708070714",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.90778648853302
	},
	{
		"id": "1708077565",
		"title": "masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/bf1b141f90214-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-takm-iid-1708077565",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9832268357276917
	},
	{
		"id": "1707848084",
		"title": "toptan masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/662ca48882e74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/toptan-masa-sandalye-iid-1707848084",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9827473759651184
	},
	{
		"id": "1720284320",
		"title": "k\u00f6\u015fe koltuk ve masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00c7atalca",
		"image": "https://imvm.letgo.com/v1/files/aff359015da84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kose-koltuk-ve-masa-sandalye-iid-1720284320",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9966908693313599
	},
	{
		"id": "1723690329",
		"title": "masa sandalye\n",
		"price": "19 TL",
		"location": "\u0130stanbul, Sultangazi",
		"image": "https://imvm.letgo.com/v1/files/75dab246a6e34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1723690329",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9919241070747375
	},
	{
		"id": "1707506773",
		"title": "bistro masa sandalye modelleri\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/c40db499f9224-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bistro-masa-sandalye-modelleri-iid-1707506773",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.8676331639289856
	},
	{
		"id": "1722072928",
		"title": "Avangart Masa sandalye\n",
		"price": "100 TL",
		"location": "\u0130stanbul, Ba\u015fak\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/30029913ac8c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/avangart-masa-sandalye-iid-1722072928",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9926438927650452
	},
	{
		"id": "1722228395",
		"title": "fincan mermer masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/a18af4811a624-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/fincan-mermer-masa-sandalye-takm-iid-1722228395",
		"scrapedAt": "2026-01-25T10:15:43.113Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9566117525100708
	},
	{
		"id": "1709136210",
		"title": "plastik rattan masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/8fc1bce79b724-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/plastik-rattan-masa-sandalye-takm-iid-1709136210",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9797588586807251
	},
	{
		"id": "1718637327",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/ed3557349c9f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1718637327",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9919711351394653
	},
	{
		"id": "1709222184",
		"title": "okey masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/9f871ed2de2c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/okey-masa-sandalye-iid-1709222184",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9294288158416748
	},
	{
		"id": "1708858534",
		"title": "masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/848e632db9e24-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-takm-iid-1708858534",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9909369349479675
	},
	{
		"id": "1722435447",
		"title": "karen sandalye mdf masa tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/f375068a265d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/karen-sandalye-mdf-masa-takm-iid-1722435447",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9287075996398926
	},
	{
		"id": "1719987716",
		"title": "katlan\u0131r masa sandalye\n",
		"price": "4 TL",
		"location": "\u0130stanbul, Gaziosmanpa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/27241e6a91904-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/katlanr-masa-sandalye-iid-1719987716",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9927761554718018
	},
	{
		"id": "1721820725",
		"title": "Sandalye Masa\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/3ba540e144134-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sandalye-masa-iid-1721820725",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9562718868255615
	},
	{
		"id": "1723595953",
		"title": "organizasyon Masa sandalye\n",
		"price": "199 TL",
		"location": "\u0130stanbul, Ba\u015fak\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/7c40fdeaad734-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/organizasyon-masa-sandalye-iid-1723595953",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.98270583152771
	},
	{
		"id": "1723860444",
		"title": "MONAKO SANDALYE MERMER MASA MODEL\u0130\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/1fc863eaa8754-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/monako-sandalye-mermer-masa-modeli-iid-1723860444",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9270298480987549
	},
	{
		"id": "1709346323",
		"title": "mermer masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/ba18b6b18cf84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/mermer-masa-sandalye-takm-iid-1709346323",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9938388466835022
	},
	{
		"id": "1722073582",
		"title": "okey masa sandalye tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/fc60d77b42484-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/okey-masa-sandalye-takm-iid-1722073582",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9771438241004944
	},
	{
		"id": "1723482138",
		"title": "Ofis masa ve sandalye\n",
		"price": "100 TL",
		"location": "\u0130stanbul, Be\u015fikta\u015f",
		"image": "https://imvm.letgo.com/v1/files/d9f9f179979d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ofis-masa-ve-sandalye-iid-1723482138",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9998654127120972
	},
	{
		"id": "1711652831",
		"title": "masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/e3a07dd8ac7b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1711652831",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9943985342979431
	},
	{
		"id": "1720070999",
		"title": "masa sandalye\n",
		"price": "12 TL",
		"location": "\u0130stanbul, Sultangazi",
		"image": "https://imvm.letgo.com/v1/files/4b696cbad7c44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1720070999",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.978387713432312
	},
	{
		"id": "1686631521",
		"title": "\u0130malattan Toplant\u0131 Odas\u0131 Masa Ve Sandalye Tak\u0131m\u0131\n",
		"price": "2 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/b22741d201ab4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-toplant-odas-masa-ve-sandalye-takm-iid-1686631521",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.999871015548706
	},
	{
		"id": "1656016487",
		"title": "Masa sandalye masa\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/jagirst29o2z2-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-masa-iid-1656016487",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.887273371219635
	},
	{
		"id": "1668221913",
		"title": "Masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/qujs3jm1lv6h-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1668221913",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9875184893608093
	},
	{
		"id": "1722851563",
		"title": "ptt masa sandalye\n",
		"price": "5 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/619626d470bb4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ptt-masa-sandalye-iid-1722851563",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.8809962868690491
	},
	{
		"id": "1723749902",
		"title": "polo sandalye mermer masa modeli\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/e3e84781a9f54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/polo-sandalye-mermer-masa-modeli-iid-1723749902",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.957728385925293
	},
	{
		"id": "1724003477",
		"title": "UCUZA!2 tane bazal\u0131 yatak+2 tane dolap+masa 4 sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/ed5cf88005ca4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucuza2-tane-bazal-yatak2-tane-dolapmasa-4-sandalye-iid-1724003477",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9772547483444214
	},
	{
		"id": "1711506358",
		"title": "Tertemiz Masa ve Sandalye Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/1bac14882be84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/tertemiz-masa-ve-sandalye-takm-iid-1711506358",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.994755744934082
	},
	{
		"id": "1656250170",
		"title": "Masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/1vbhoj1qima4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-iid-1656250170",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9177696108818054
	},
	{
		"id": "1719734354",
		"title": "g\u00fczellik merkezi masa sandalye\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/d744ae0b6d1d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/guzellik-merkezi-masa-sandalye-iid-1719734354",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9595909714698792
	},
	{
		"id": "837757243",
		"title": "Masa sandalye tak?m kahve\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/lkttbu2smn9o3-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/masa-sandalye-takm-kahve-iid-837757243",
		"scrapedAt": "2026-01-25T10:15:43.114Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9815508127212524
	},
	{
		"id": "1632594354",
		"title": "Perde g\u00fcne\u015flik\n",
		"price": "170 TL",
		"location": "\u0130stanbul, Sultanbeyli",
		"image": "https://imvm.letgo.com/v1/files/xi86866rdylg1-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/perde-guneslik-iid-1632594354",
		"scrapedAt": "2026-01-25T10:15:42.551Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.9998779296875
	},
	{
		"id": "1720628872",
		"title": "perde g\u00fcne\u015flik\n",
		"price": "200 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/4f39d8c16a814-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/perde-guneslik-iid-1720628872",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.8728787899017334
	},
	{
		"id": "1722699283",
		"title": "balkon perde g\u00fcne\u015flik\n",
		"price": "130 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/b6681a10a1954-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/balkon-perde-guneslik-iid-1722699283",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.9998675584793091
	},
	{
		"id": "1710835001",
		"title": "g\u00fcne\u015flik-t\u00fcl stor perde\n",
		"price": "125 TL",
		"location": "\u0130stanbul, Pendik",
		"image": "https://imvm.letgo.com/v1/files/6ec3d18d51bf4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/guneslik-tul-stor-perde-iid-1710835001",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.9793658256530762
	},
	{
		"id": "1724025026",
		"title": "SEVG\u0130 PERDE\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u015fak\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/3b82f390dcc14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sevgi-perde-iid-1724025026",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.9363212585449219
	},
	{
		"id": "1721322712",
		"title": "perde\n",
		"price": "200 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/55317ad0696b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/perde-iid-1721322712",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.9300307631492615
	},
	{
		"id": "1713359060",
		"title": "Adet ve hepsinin fiyati farkli! Tul perdeler\n",
		"price": "165 TL",
		"location": "4.6 ",
		"image": "https://imvm.letgo.com/v1/files/3e99e0152be54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/adet-ve-hepsinin-fiyati-farkli-tul-perdeler-iid-1713359060",
		"scrapedAt": "2026-01-25T10:15:42.552Z",
		"verified_agent": "AGENT_07_CURTAINS",
		"confidence_score": 0.874711811542511
	},
	{
		"id": "1723725063",
		"title": "f\u0131rsat!! ta\u015f\u0131n\u0131yorum acil sat\u0131l\u0131k a\u00e7\u0131k dolap\n",
		"price": "40 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/e3b0e0757c314-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/frsat-tasnyorum-acil-satlk-ack-dolap-iid-1723725063",
		"scrapedAt": "2026-01-25T10:15:49.472Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9999405145645142
	},
	{
		"id": "1654300588",
		"title": "Bilgisayar masas\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/er0emtqzr2t62-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bilgisayar-masas-iid-1654300588",
		"scrapedAt": "2026-01-25T10:15:49.472Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9995427131652832
	},
	{
		"id": "1723742489",
		"title": "f\u0131r\u0131n sat\u0131l\u0131k\n",
		"price": "5 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/bd8055b3837f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/frn-satlk-iid-1723742489",
		"scrapedAt": "2026-01-25T10:15:51.042Z",
		"verified_agent": "AGENT_03_STOVE",
		"confidence_score": 0.9998652935028076
	},
	{
		"id": "1723911994",
		"title": "bedava ama sorunlu \u00e7ama\u015f\u0131r makinesi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/8505d7e770174-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bedava-ama-sorunlu-camasr-makinesi-iid-1723911994",
		"scrapedAt": "2026-01-25T10:15:51.042Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9957362413406372
	},
	{
		"id": "1722528984",
		"title": "bedava yatakl\u0131 \u00e7ekyat\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/89028ec5bbd04-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bedava-yatakl-cekyat-iid-1722528984",
		"scrapedAt": "2026-01-25T10:15:51.042Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9927566647529602
	},
	{
		"id": "1714987146",
		"title": "Bosch \u00c7ama\u015f\u0131r Makinesi\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/1a3dd7fd251f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bosch-camasr-makinesi-iid-1714987146",
		"scrapedAt": "2026-01-25T10:13:41.922Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9987947940826416
	},
	{
		"id": "1724013166",
		"title": "\u00c7ama\u015f\u0131r makinesi tamir\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/4dc84cc53afc4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/camasr-makinesi-tamir-iid-1724013166",
		"scrapedAt": "2026-01-25T10:13:41.922Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9936741590499878
	},
	{
		"id": "1723935122",
		"title": "Samsung \u00c7ama\u015f\u0131r Makinesi (Kazan\u0131 Bozuk)\n",
		"price": "100 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/e0a53f5331c04-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/samsung-camasr-makinesi-kazan-bozuk-iid-1723935122",
		"scrapedAt": "2026-01-25T10:13:41.923Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9983616471290588
	},
	{
		"id": "1724026393",
		"title": "\u00e7al\u0131\u015f\u0131r \u00e7ama\u015f\u0131r makinesi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/e14d14d615984-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/calsr-camasr-makinesi-iid-1724026393",
		"scrapedAt": "2026-01-25T10:13:41.923Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9942485094070435
	},
	{
		"id": "1721529076",
		"title": "toptan 50 par\u00e7a sorunsuz modelli \u00e7ama\u015f\u0131r makinesi\n",
		"price": "10 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/f6d12f621fca4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/toptan-50-parca-sorunsuz-modelli-camasr-makinesi-iid-1721529076",
		"scrapedAt": "2026-01-25T10:13:41.923Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9980469942092896
	},
	{
		"id": "1702412924",
		"title": "Ciddi Aliciysan Yaz Bulasik Camasir Makinesi Kirec Kirici Aparat\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/fd6666f1ac064-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ciddi-aliciysan-yaz-bulasik-camasir-makinesi-kirec-kirici-aparat-iid-1702412924",
		"scrapedAt": "2026-01-25T10:13:41.924Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9750918745994568
	},
	{
		"id": "1681234916",
		"title": "\u00c7ama\u015f\u0131r makinesi\n",
		"price": "100 TL",
		"location": "\u0130stanbul, Sar\u0131yer",
		"image": "https://imvm.letgo.com/v1/files/c17d7a1dfcf74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/camasr-makinesi-iid-1681234916",
		"scrapedAt": "2026-01-25T10:13:41.924Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9916216135025024
	},
	{
		"id": "1703230263",
		"title": "bosch \u00e7ama\u015f\u0131r makinesi program cihaz\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/4fdd5f58f0844-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bosch-camasr-makinesi-program-cihaz-iid-1703230263",
		"scrapedAt": "2026-01-25T10:13:41.924Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.8801213502883911
	},
	{
		"id": "1724009374",
		"title": "ARIZALI Wd8122cvd Samsung \u00e7ama\u015f\u0131r makinesi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Kartal",
		"image": "https://imvm.letgo.com/v1/files/f2aabbf1247f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/arizali-wd8122cvd-samsung-camasr-makinesi-iid-1724009374",
		"scrapedAt": "2026-01-25T10:13:41.925Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9151788353919983
	},
	{
		"id": "1724010258",
		"title": "\u0130stanbul bula\u015f\u0131k buzdolab\u0131 \u00c7ama\u015f\u0131r Makinesi Ustas\u0131 (Kazan / Rulman)\n",
		"price": "123 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/3db14259d66c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/istanbul-bulask-buzdolab-camasr-makinesi-ustas-kazan-rulman-iid-1724010258",
		"scrapedAt": "2026-01-25T10:13:41.925Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9884372353553772
	},
	{
		"id": "1722073974",
		"title": "Bosch \u00c7ama\u015f\u0131r Makinesi\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/dcb32d5b24654-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bosch-camasr-makinesi-iid-1722073974",
		"scrapedAt": "2026-01-25T10:13:41.925Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9964113831520081
	},
	{
		"id": "1724022864",
		"title": "\u00fccretsiz baza ve yatak\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Kad\u0131k\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/c866e541cf844-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-baza-ve-yatak-iid-1724022864",
		"scrapedAt": "2026-01-25T10:13:50.191Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9884204864501953
	},
	{
		"id": "1701348122",
		"title": "yatak+baza+yatak ba\u015f\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/e007731932e14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatakbazayatak-bas-iid-1701348122",
		"scrapedAt": "2026-01-25T10:13:50.191Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.8804688453674316
	},
	{
		"id": "1695825151",
		"title": "PERGE YATAK ODASI TAKIMI YATAK BAZA DAH\u0130L\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/4a841487c4354-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/perge-yatak-odasi-takimi-yatak-baza-dahil-iid-1695825151",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9523488879203796
	},
	{
		"id": "1723379310",
		"title": "\u00fccretsiz yatak baza dolap e\u015fya\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/34ec58be94644-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-yatak-baza-dolap-esya-iid-1723379310",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9806015491485596
	},
	{
		"id": "1723857312",
		"title": "TEK K\u0130\u015e\u0130L\u0130K YATAK BAZA BA\u015eLIK\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/7ebac0338d914-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/tek-kisilik-yatak-baza-baslik-iid-1723857312",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.8740202784538269
	},
	{
		"id": "1723625477",
		"title": "tek ki\u015filik yatak. baza ba\u015fl\u0131k olarak\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/ef6ab4611e894-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/tek-kisilik-yatak-baza-baslk-olarak-iid-1723625477",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9272661805152893
	},
	{
		"id": "1723882275",
		"title": "yatak odas\u0131 tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/824c474cf1984-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-odas-takm-iid-1723882275",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9388369917869568
	},
	{
		"id": "1723855403",
		"title": "yatak odas\u0131 tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/ead686ce4fb74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-odas-takm-iid-1723855403",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.8696045279502869
	},
	{
		"id": "1723271793",
		"title": "Sand\u0131kl\u0131 baza & yatak \u00d6\u011frenciye \u00dccretsiz Verilecek\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/69c44df45ac94-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sandkl-baza-yatak-ogrenciye-ucretsiz-verilecek-iid-1723271793",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9782848954200745
	},
	{
		"id": "1720957518",
		"title": "S\u0131f\u0131r tek ki\u015filik yatak baza ba\u015fl\u0131k\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/23540f2a7bff4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-tek-kisilik-yatak-baza-baslk-iid-1720957518",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9971489310264587
	},
	{
		"id": "1720957970",
		"title": "S\u0131f\u0131r \u00e7ift ki\u015filik yatak baza ba\u015fl\u0131k\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/96cefdc74b764-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-cift-kisilik-yatak-baza-baslk-iid-1720957970",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.992252767086029
	},
	{
		"id": "1721312090",
		"title": "Yatak+Baza+Yatak ba\u015fl\u0131\u011f\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/0b85c61f4c324-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatakbazayatak-baslg-iid-1721312090",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9480076432228088
	},
	{
		"id": "1721042472",
		"title": "gardrop baza ve yatak sat\u0131l\u0131k\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Be\u015fikta\u015f",
		"image": "https://imvm.letgo.com/v1/files/ec89d07717df4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/gardrop-baza-ve-yatak-satlk-iid-1721042472",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9902618527412415
	},
	{
		"id": "1721327759",
		"title": "BAZA YATAK\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/5c1bfafbf5b54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-yatak-iid-1721327759",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9979285001754761
	},
	{
		"id": "1722174011",
		"title": "Tek ki\u015filik yatak baza\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/52aa9d9830df4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/tek-kisilik-yatak-baza-iid-1722174011",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9243103265762329
	},
	{
		"id": "1723854341",
		"title": "hurda \u00e7ama\u015f\u0131r makinesi buzdolab\u0131 kombi yatak baza al\u0131n\u0131r\n",
		"price": "10 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/eaaa3eb14a7f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/hurda-camasr-makinesi-buzdolab-kombi-yatak-baza-alnr-iid-1723854341",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_02_WASHER",
		"confidence_score": 0.9992361068725586
	},
	{
		"id": "1723870994",
		"title": "DOLAP BAZA YATAK NE LAZIMSA\n",
		"price": "10 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/4ae84295808c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-baza-yatak-ne-lazimsa-iid-1723870994",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9339726567268372
	},
	{
		"id": "1703422141",
		"title": "baza ba\u015fl\u0131k yatak\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Arnavutk\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/dea2a07edc1c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-baslk-yatak-iid-1703422141",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9951485991477966
	},
	{
		"id": "1718064451",
		"title": "\u00dccretsiz \u00e7ift ki\u015filik yatak\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Kad\u0131k\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/fbe37bedbeb74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-cift-kisilik-yatak-iid-1718064451",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9896383285522461
	},
	{
		"id": "1722247031",
		"title": "Baza yatak tekli \u00fccretsiz\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Maltepe",
		"image": "https://imvm.letgo.com/v1/files/2fbd8b88c9124-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-yatak-tekli-ucretsiz-iid-1722247031",
		"scrapedAt": "2026-01-25T10:13:50.192Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9555193185806274
	},
	{
		"id": "1723790095",
		"title": "1 \u00e7ift ki\u015filik yatak, 2 ayr\u0131 baza\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/a8ecf3998a774-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/1-cift-kisilik-yatak-2-ayr-baza-iid-1723790095",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9967783093452454
	},
	{
		"id": "1721724393",
		"title": "yatak+baza\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/b51d9d6264584-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatakbaza-iid-1721724393",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9491305947303772
	},
	{
		"id": "1702396003",
		"title": "baza ba\u015fl\u0131k\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/db46febcd7c64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-baslk-iid-1702396003",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9881744384765625
	},
	{
		"id": "1723866659",
		"title": "baza yatak ba\u015fl\u0131k 4 l\u00fc dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Pendik",
		"image": "https://imvm.letgo.com/v1/files/1d433e16e2074-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-yatak-baslk-4-lu-dolap-iid-1723866659",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.994723916053772
	},
	{
		"id": "1710580150",
		"title": "yatak ba\u015fl\u0131\u011f\u0131 baza ba\u015fl\u0131\u011f\u0131 160 lik yatak baza ba\u015fl\u0131\u011f\u0131\n",
		"price": "400 TL",
		"location": "4.5 ",
		"image": "https://imvm.letgo.com/v1/files/f8b596e7e9c84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-baslg-baza-baslg-160-lik-yatak-baza-baslg-iid-1710580150",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9096792340278625
	},
	{
		"id": "1724000736",
		"title": "2li yatak bazas\u0131\n",
		"price": "500 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/8c9e8eeef6284-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/2li-yatak-bazas-iid-1724000736",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9957042336463928
	},
	{
		"id": "1723871100",
		"title": "acil sat\u0131l\u0131k uygun fiyata baza ba\u015fl\u0131k yatak\n",
		"price": "1 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/ec2949b18c164-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/acil-satlk-uygun-fiyata-baza-baslk-yatak-iid-1723871100",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9305161833763123
	},
	{
		"id": "1668860349",
		"title": "\u0130malattan Baza Yatak Ba\u015fl\u0131k Modelleri\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/krehhzgzdks51-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-baza-yatak-baslk-modelleri-iid-1668860349",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9963311553001404
	},
	{
		"id": "1721232325",
		"title": "baza basligi\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/539b72feed184-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-basligi-iid-1721232325",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.8619672060012817
	},
	{
		"id": "1723266017",
		"title": "istikbal yatak baza\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/5db4cec0a88c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/istikbal-yatak-baza-iid-1723266017",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9608947038650513
	},
	{
		"id": "1723359636",
		"title": "baza yatak\n",
		"price": "300 TL",
		"location": "\u0130stanbul, Gaziosmanpa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/d497260cf39b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-yatak-iid-1723359636",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9271989464759827
	},
	{
		"id": "1722121659",
		"title": "s\u0131f\u0131r baza yatak basl\u0131k 4 l\u00fc dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Pendik",
		"image": "https://imvm.letgo.com/v1/files/819fd32bf3074-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-baza-yatak-baslk-4-lu-dolap-iid-1722121659",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9950920343399048
	},
	{
		"id": "1719879772",
		"title": "yatak , baza , ba\u015fl\u0131k .\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Gaziosmanpa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/33e3a5b10da14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-baza-baslk-iid-1719879772",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9423978924751282
	},
	{
		"id": "1695825207",
		"title": "YATAK ODASI TAKIMI YATAK BAZA DAH\u0130L\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/2fd1f1ccc4074-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-odasi-takimi-yatak-baza-dahil-iid-1695825207",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9864820241928101
	},
	{
		"id": "1723586670",
		"title": "\u00e7ift ki\u015filik baza ba\u015fl\u0131k yatak\n",
		"price": "99 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/80351ad399884-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cift-kisilik-baza-baslk-yatak-iid-1723586670",
		"scrapedAt": "2026-01-25T10:13:50.193Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9947208166122437
	},
	{
		"id": "1723586564",
		"title": "baza ba\u015fl\u0131k yatak \u00e7ift ki\u015filik tek ki\u015filik\n",
		"price": "99 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/d038f84c4f944-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/baza-baslk-yatak-cift-kisilik-tek-kisilik-iid-1723586564",
		"scrapedAt": "2026-01-25T10:13:50.194Z",
		"verified_agent": "AGENT_04_BED",
		"confidence_score": 0.9978760480880737
	},
	{
		"id": "1723487078",
		"title": "Temiz medikal buzdolab\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/84827b6106004-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/temiz-medikal-buzdolab-iid-1723487078",
		"scrapedAt": "2026-01-25T10:13:38.036Z",
		"verified_agent": "AGENT_01_FRIDGE",
		"confidence_score": 0.8896855115890503
	},
	{
		"id": "1721112409",
		"title": "alaska buzdolab\u0131\n",
		"price": "300 TL",
		"location": "\u0130stanbul, Kad\u0131k\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/3a9fc94d58fa4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/alaska-buzdolab-iid-1721112409",
		"scrapedAt": "2026-01-25T10:13:38.036Z",
		"verified_agent": "AGENT_01_FRIDGE",
		"confidence_score": 0.9430537223815918
	},
	{
		"id": "1723764233",
		"title": "vestel buzdolab\u0131 yedek par\u00e7a\n",
		"price": "99 TL",
		"location": "\u0130stanbul, Kad\u0131k\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/cc1c0828cfe64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/vestel-buzdolab-yedek-parca-iid-1723764233",
		"scrapedAt": "2026-01-25T10:13:38.036Z",
		"verified_agent": "AGENT_01_FRIDGE",
		"confidence_score": 0.9435579776763916
	},
	{
		"id": "1723943894",
		"title": "L Koltuk Ve Buzdolab\u0131\n",
		"price": "300 TL",
		"location": "\u0130stanbul, Esenler",
		"image": "https://imvm.letgo.com/v1/files/1d6df2cf9ae54-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/l-koltuk-ve-buzdolab-iid-1723943894",
		"scrapedAt": "2026-01-25T10:13:38.036Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.900559663772583
	},
	{
		"id": "1679529629",
		"title": "Buzdolab\u0131 D\u00fczenleyici\n",
		"price": "450 TL",
		"location": "12 taksit",
		"image": "https://imvm.letgo.com/v1/files/7854e5ccd0344-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/buzdolab-duzenleyici-iid-1679529629",
		"scrapedAt": "2026-01-25T10:13:38.036Z",
		"verified_agent": "AGENT_01_FRIDGE",
		"confidence_score": 0.8757167458534241
	},
	{
		"id": "1724003168",
		"title": "\u00dcCRETS\u0130Z 3+2+1+1 Koltuk Tak\u0131m\u0131\n",
		"price": "85 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/6cedf58d0dae4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-3211-koltuk-takm-iid-1724003168",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9869104027748108
	},
	{
		"id": "1723881876",
		"title": "koltuk tak\u0131m\u0131 oturma gurubu\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f625bd0bee7e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-oturma-gurubu-iid-1723881876",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9968729615211487
	},
	{
		"id": "1723881730",
		"title": "koltuk tak\u0131m\u0131 oturma gurubu\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/78d64c4794b94-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-oturma-gurubu-iid-1723881730",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9988308548927307
	},
	{
		"id": "1723878645",
		"title": "Uygun fiyata Koltuk tak\u0131m\u0131 nakliyesi yap\u0131l\u0131r.\n",
		"price": "10 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/456f77496e494-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/uygun-fiyata-koltuk-takm-nakliyesi-yaplr-iid-1723878645",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9972993731498718
	},
	{
		"id": "1709333262",
		"title": "vera koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/cccdf04cc4314-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/vera-koltuk-takm-iid-1709333262",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9843336939811707
	},
	{
		"id": "1709333486",
		"title": "arya koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/ab084141b6bd4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/arya-koltuk-takm-iid-1709333486",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9925174713134766
	},
	{
		"id": "1666097840",
		"title": "Koltuk tak\u0131m\u0131\n",
		"price": "250 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/2tz3e9t4lzes-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1666097840",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9967076778411865
	},
	{
		"id": "1723971326",
		"title": "d\u00fc\u011f\u00fcn paketi koltuk yatak odas\u0131 tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/bd22272199014-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dugun-paketi-koltuk-yatak-odas-takm-iid-1723971326",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.988959550857544
	},
	{
		"id": "1723697163",
		"title": "\u00fccretsiz koltuk tak\u0131m\u0131 3+2 enza home\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/68aec27bb1514-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-koltuk-takm-32-enza-home-iid-1723697163",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9978145360946655
	},
	{
		"id": "1721518441",
		"title": "SALON KOLTUK TAKIMI\n",
		"price": "10 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/de0a2fbb86184-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/salon-koltuk-takimi-iid-1721518441",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9900508522987366
	},
	{
		"id": "1720142601",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/6ea9c641c6794-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1720142601",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.923008918762207
	},
	{
		"id": "1708212701",
		"title": "bois koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/87d4efb902534-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/bois-koltuk-takm-iid-1708212701",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.988888680934906
	},
	{
		"id": "1723377951",
		"title": "L k\u00f6\u015fe koltuk, Ev E\u015fyas\u0131, Nakliye, Koltuk Tak\u0131m\u0131\n",
		"price": "22 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/8ce0524c0b334-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/l-kose-koltuk-ev-esyas-nakliye-koltuk-takm-iid-1723377951",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9735158681869507
	},
	{
		"id": "1629744568",
		"title": "\u0130malattan koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/w4g09os234wd-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-koltuk-takm-iid-1629744568",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9995118379592896
	},
	{
		"id": "1723904355",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/d1dfa729947d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1723904355",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9956670999526978
	},
	{
		"id": "1627933505",
		"title": "\u0130malattan koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/wnb12erho29z2-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-koltuk-takm-iid-1627933505",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9965734481811523
	},
	{
		"id": "1723887743",
		"title": "k\u00f6\u015fe koltuk tak\u0131m\u0131\n",
		"price": "100 TL",
		"location": "\u0130stanbul, Be\u015fikta\u015f",
		"image": "https://imvm.letgo.com/v1/files/b5be41803b014-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kose-koltuk-takm-iid-1723887743",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9991738200187683
	},
	{
		"id": "1723273720",
		"title": "koltuk tak\u0131m\u0131 \u00f6\u011frenciye \u00fccretsiz verilecek\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/17bc6f0dc22f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-ogrenciye-ucretsiz-verilecek-iid-1723273720",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9842326641082764
	},
	{
		"id": "1693606230",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/8c8d9b004eba4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1693606230",
		"scrapedAt": "2026-01-25T10:13:49.380Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9983726143836975
	},
	{
		"id": "1693670675",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/4c31027564634-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1693670675",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9979660511016846
	},
	{
		"id": "1698992492",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/3633d39bd8d24-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1698992492",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9227743744850159
	},
	{
		"id": "1711568884",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/cd1534cb00984-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1711568884",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9914974570274353
	},
	{
		"id": "1700600610",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/e3ed031a3d9a4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1700600610",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9981470108032227
	},
	{
		"id": "1695765334",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/b6dfe84db1e74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1695765334",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9984570741653442
	},
	{
		"id": "1699450350",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/adb7e8f9fcf74-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1699450350",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9990121126174927
	},
	{
		"id": "1698790632",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/3c3fc58d09f24-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1698790632",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9995212554931641
	},
	{
		"id": "1697511206",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f69a45eeaac64-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1697511206",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9907426238059998
	},
	{
		"id": "1697866702",
		"title": "koltuk takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/6c1edbc49a014-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1697866702",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9182252883911133
	},
	{
		"id": "1720843146",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/61ea84b2d64d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1720843146",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9951549768447876
	},
	{
		"id": "1722618440",
		"title": "Fasulye Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/c5c367e066cc4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/fasulye-koltuk-takm-iid-1722618440",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9640243053436279
	},
	{
		"id": "1723983060",
		"title": "\u00dcCRETS\u0130Z KOLTUK TAKIMI 2 G\u00dcN GE\u00c7ERL\u0130\n",
		"price": "1 TL",
		"location": "\u0130stanbul, G\u00fcng\u00f6ren",
		"image": "https://imvm.letgo.com/v1/files/56b335c129004-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-koltuk-takimi-2-gun-gecerli-iid-1723983060",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9948034882545471
	},
	{
		"id": "1722112044",
		"title": "KOLTUK TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/088dcffd4fe44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1722112044",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9945639371871948
	},
	{
		"id": "1720125079",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/c3802374079d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1720125079",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9871174693107605
	},
	{
		"id": "1723865996",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "3 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/0dd1413ad2e34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1723865996",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9963678121566772
	},
	{
		"id": "1719887859",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/751b083a80dc4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1719887859",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9900022745132446
	},
	{
		"id": "1722363000",
		"title": "Fasulye Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/2f06b643461e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/fasulye-koltuk-takm-iid-1722363000",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9782319664955139
	},
	{
		"id": "1722981527",
		"title": "\u0130der - Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcsk\u00fcdar",
		"image": "https://imvm.letgo.com/v1/files/bf4ce0ef31aa4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ider---koltuk-takm-iid-1722981527",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9833917617797852
	},
	{
		"id": "1723716408",
		"title": "Koltuk Tak\u0131m\u0131 (Maxi)\n",
		"price": "100 TL",
		"location": "\u0130stanbul, Kad\u0131k\u00f6y",
		"image": "https://imvm.letgo.com/v1/files/122a4cbf29174-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-maxi-iid-1723716408",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9897298812866211
	},
	{
		"id": "1716557628",
		"title": "Koltuk Cekyat Takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/ca726e5694334-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-cekyat-takimi-iid-1716557628",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9993720650672913
	},
	{
		"id": "1723791670",
		"title": "Antika Koltuk\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Fatih",
		"image": "https://imvm.letgo.com/v1/files/fc69eacb80a34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/antika-koltuk-iid-1723791670",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9886400699615479
	},
	{
		"id": "1723439660",
		"title": "koltuk\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/be395cc28bc34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-iid-1723439660",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9979199767112732
	},
	{
		"id": "1723408817",
		"title": "KAPORASIZ KAPIDA \u00d6DEME KOLTUK TAK\u0130M\u0130\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/3ccaf4f085f34-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kaporasiz-kapida-odeme-koltuk-takimi-iid-1723408817",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9798498153686523
	},
	{
		"id": "1722244419",
		"title": "Fasulye Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/a316fc01937a4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/fasulye-koltuk-takm-iid-1722244419",
		"scrapedAt": "2026-01-25T10:13:49.381Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9928297400474548
	},
	{
		"id": "1695765271",
		"title": "koltuk takimi 3+3+1\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/5a74756e49004-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-331-iid-1695765271",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9939206838607788
	},
	{
		"id": "1707470654",
		"title": "Sat\u0131l\u0131k Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sultanbeyli",
		"image": "https://imvm.letgo.com/v1/files/25d88684b7734-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/satlk-koltuk-takm-iid-1707470654",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9975671768188477
	},
	{
		"id": "1722362824",
		"title": "Fasulye Koltuk Tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u015fak\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/1449f1ceb95c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/fasulye-koltuk-takm-iid-1722362824",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.978440523147583
	},
	{
		"id": "1719566602",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/f2ef04ba3de84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1719566602",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9971359968185425
	},
	{
		"id": "1722111831",
		"title": "\u00c7OK UYGUN F\u0130YATA KOLTUK TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sultangazi",
		"image": "https://imvm.letgo.com/v1/files/1bba4f4abf364-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cok-uygun-fiyata-koltuk-takimi-iid-1722111831",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9972072243690491
	},
	{
		"id": "1722111930",
		"title": "\u00c7OK UYGUN F\u0130YATA KOLTUK TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ey\u00fcp",
		"image": "https://imvm.letgo.com/v1/files/940e8a1bf85d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cok-uygun-fiyata-koltuk-takimi-iid-1722111930",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9946182370185852
	},
	{
		"id": "1716348735",
		"title": "KOLTUK TAKIMI\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/a25bd6d5ecce4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-iid-1716348735",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9984506368637085
	},
	{
		"id": "1716184649",
		"title": "KOLTUK TAKIMI TAM\u0130R\u0130 YAP\u0130L\u0130R\n",
		"price": "111 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/5f4d068f7caf4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takimi-tamiri-yapilir-iid-1716184649",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9998132586479187
	},
	{
		"id": "1640060570",
		"title": "Koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/ptxk0ydv0au8-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1640060570",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9878605008125305
	},
	{
		"id": "1723754167",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/2eec4dee793f4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1723754167",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9977091550827026
	},
	{
		"id": "1723866575",
		"title": "koltuk tak\u0131m\u0131 4 parca\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Pendik",
		"image": "https://imvm.letgo.com/v1/files/64666750f2c14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-4-parca-iid-1723866575",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9985985159873962
	},
	{
		"id": "1723725943",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u015fak\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/5acd2a833a064-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1723725943",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9865800738334656
	},
	{
		"id": "1723718575",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/f0cf197b201d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1723718575",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9964966177940369
	},
	{
		"id": "1724026308",
		"title": "AC\u0130L koltuk tak\u0131m\u0131 evden indirmeye \u00fc\u015fendim AC\u0130L\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/7641691df1634-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/acil-koltuk-takm-evden-indirmeye-usendim-acil-iid-1724026308",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.8777515292167664
	},
	{
		"id": "1723815584",
		"title": "koltuk tak\u0131m\u0131 s\u0131f\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Esenyurt",
		"image": "https://imvm.letgo.com/v1/files/6da86d6adbce4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-sfr-iid-1723815584",
		"scrapedAt": "2026-01-25T10:13:49.382Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9930323362350464
	},
	{
		"id": "1723762448",
		"title": "\u00fccretsiz koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, K\u00fc\u00e7\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/fdd62c7458b14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-koltuk-takm-iid-1723762448",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9972431659698486
	},
	{
		"id": "1629745361",
		"title": "\u0130malattan koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/x1zvbxyez1kq3-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalattan-koltuk-takm-iid-1629745361",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9987603425979614
	},
	{
		"id": "1723299461",
		"title": "KAPORASIZ KAP\u0130DA \u00d6DEME KOLTUK TAK\u0130M\u0130\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Zeytinburnu",
		"image": "https://imvm.letgo.com/v1/files/397fe96ac0cc4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kaporasiz-kapida-odeme-koltuk-takimi-iid-1723299461",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9573915004730225
	},
	{
		"id": "1724021955",
		"title": "koltuk ve vitrin takimi\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/b5f12dbb617c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-ve-vitrin-takimi-iid-1724021955",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9782842993736267
	},
	{
		"id": "1723473707",
		"title": "acill!!koltuk tak\u0131m\u0131\n",
		"price": "500 TL",
		"location": "9 taksit",
		"image": "https://imvm.letgo.com/v1/files/70f4fad1650e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/acillkoltuk-takm-iid-1723473707",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9974837303161621
	},
	{
		"id": "1718007105",
		"title": "koltuk tak\u0131m\u0131 ilan s\u00fcresi son 1 alan ald\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/e46c86228eef4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-ilan-suresi-son-1-alan-ald-iid-1718007105",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9147809147834778
	},
	{
		"id": "1721631536",
		"title": "koltuk tak\u0131m\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bayrampa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/3ec686ed8e0a4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/koltuk-takm-iid-1721631536",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9986347556114197
	},
	{
		"id": "1680553027",
		"title": "Holiday Amazon Koltuk Tak\u0131m\u0131 Bah\u00e7e Balkon Teras Cafe vs\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/d759c6f885e84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/holiday-amazon-koltuk-takm-bahce-balkon-teras-cafe-vs-iid-1680553027",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9925479292869568
	},
	{
		"id": "1688237740",
		"title": "\u00c7OK UYGUN F\u0130YATA \u0130MALATTAN KOLTUK TAKIMI RENK SE\u00c7ENEKLER\u0130 MEVCUT\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/e7b737decc054-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/cok-uygun-fiyata-imalattan-koltuk-takimi-renk-secenekleri-mevcut-iid-1688237740",
		"scrapedAt": "2026-01-25T10:13:49.383Z",
		"verified_agent": "AGENT_05_SOFA",
		"confidence_score": 0.9991294741630554
	},
	{
		"id": "1723791420",
		"title": "Gard\u0131rop, Dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, B\u00fcy\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/f91bcaa93f544-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/gardrop-dolap-iid-1723791420",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9943481087684631
	},
	{
		"id": "1719273554",
		"title": "DOLAP GARDROP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ka\u011f\u0131thane",
		"image": "https://imvm.letgo.com/v1/files/b2b4a28933844-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-gardrop-iid-1719273554",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9995660185813904
	},
	{
		"id": "1703879097",
		"title": "Mavi Dolap, gard\u0131rop, vestiyer\n",
		"price": "5 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/d0253c5169e44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/mavi-dolap-gardrop-vestiyer-iid-1703879097",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9983066320419312
	},
	{
		"id": "1723658230",
		"title": "Gard\u0131rop iki kapakl\u0131 dolap\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Tuzla",
		"image": "https://imvm.letgo.com/v1/files/1d4fd794024b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/gardrop-iki-kapakl-dolap-iid-1723658230",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9530037641525269
	},
	{
		"id": "1718982669",
		"title": "demonte gardrop, bilgisayar masas\u0131, dolap ve a\u00e7\u0131l\u0131r kapan\u0131r yatak\n",
		"price": "1 TL",
		"location": "5.0 ",
		"image": "https://imvm.letgo.com/v1/files/208a9bb2d3794-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/demonte-gardrop-bilgisayar-masas-dolap-ve-aclr-kapanr-yatak-iid-1718982669",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.9976562261581421
	},
	{
		"id": "1723501030",
		"title": "\u0130ki kap\u0131l\u0131 gardrop dolap - \u00f6\u011frenciye uygun\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Maltepe",
		"image": "https://imvm.letgo.com/v1/files/cb1148933ccc4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/iki-kapl-gardrop-dolap---ogrenciye-uygun-iid-1723501030",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9979515671730042
	},
	{
		"id": "1715725949",
		"title": "y\u00fckl\u00fck dolap gard\u0131rop s\u00fcrg\u00fcl\u00fc kapakl\u0131d\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/6c6b8d59eb0d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yukluk-dolap-gardrop-surgulu-kapakldr-iid-1715725949",
		"scrapedAt": "2026-01-25T10:13:54.627Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.988308310508728
	},
	{
		"id": "1709315757",
		"title": "\u2022\u2022\u0130MALAT UYGUN F\u0130YATA \u00d6L\u00c7\u00dcYE VE \u0130STE\u011eE G\u00d6RE DOLAP YAPILIR\u2022\u2022\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/e1cf714efed44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalat-uygun-fiyata-olcuye-ve-istege-gore-dolap-yapilir-iid-1709315757",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.978577733039856
	},
	{
		"id": "1705413847",
		"title": "uzun dolap\n",
		"price": "350 TL",
		"location": "\u0130stanbul, K\u00fc\u00e7\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/64d231de504b4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/uzun-dolap-iid-1705413847",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9883435964584351
	},
	{
		"id": "1709316945",
		"title": "\u00fcmraniye dolap kurulum montaj\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/9a520650d04c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/umraniye-dolap-kurulum-montaj-iid-1709316945",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9907235503196716
	},
	{
		"id": "1720958310",
		"title": "S\u0131f\u0131r ayakl\u0131 s\u00fcrg\u00fcl\u00fc dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/dcfedbf136434-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-ayakl-surgulu-dolap-iid-1720958310",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9942567944526672
	},
	{
		"id": "1722945253",
		"title": "dolap\n",
		"price": "300 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/e8b17bfda7904-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-iid-1722945253",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9725950360298157
	},
	{
		"id": "1720894686",
		"title": "S\u0131f\u0131r 6 kapakl\u0131 dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/c324c283b3144-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-6-kapakl-dolap-iid-1720894686",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.987363874912262
	},
	{
		"id": "1720894494",
		"title": "S\u0131f\u0131r 4 kapakl\u0131 dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/e639c3c462e04-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-4-kapakl-dolap-iid-1720894494",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9923194050788879
	},
	{
		"id": "1720894757",
		"title": "S\u0131f\u0131r 8 kapakl\u0131 dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/f4f46bbb1baa4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-8-kapakl-dolap-iid-1720894757",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9959850311279297
	},
	{
		"id": "1720894340",
		"title": "S\u0131f\u0131r 3 kapakl\u0131 dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/4b0a40a3794a4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-3-kapakl-dolap-iid-1720894340",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.8979692459106445
	},
	{
		"id": "980045767",
		"title": "Dolap Montaj yap\u0131l\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u015ei\u015fli",
		"image": "https://imvm.letgo.com/v1/files/y0urzhy6yfna2-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-montaj-yaplr-iid-980045767",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9363929629325867
	},
	{
		"id": "1723988114",
		"title": "\u0130ki kap\u0131l\u0131 dolap\n",
		"price": "250 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/2dee410922ee4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/iki-kapl-dolap-iid-1723988114",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9893836379051208
	},
	{
		"id": "1720958583",
		"title": "S\u0131f\u0131r ayaks\u0131z s\u00fcrg\u00fcl\u00fc dolap\n",
		"price": "7 TL",
		"location": "\u0130stanbul, Beyo\u011flu",
		"image": "https://imvm.letgo.com/v1/files/c072779110254-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sfr-ayaksz-surgulu-dolap-iid-1720958583",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9887730479240417
	},
	{
		"id": "1630272742",
		"title": "Giysi Dolap , gard\u0131rop\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/4co7s11doiru-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/giysi-dolap-gardrop-iid-1630272742",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9995695948600769
	},
	{
		"id": "1701323922",
		"title": "sifir ozel Yapim dolap\n",
		"price": "45 TL",
		"location": "\u0130stanbul, Esenler",
		"image": "https://imvm.letgo.com/v1/files/f4738ecd30ed4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/sifir-ozel-yapim-dolap-iid-1701323922",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9928719401359558
	},
	{
		"id": "1721432560",
		"title": "Let \u0131\u015f\u0131kl\u0131 dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ba\u011fc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/41bea4c4f1624-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/let-skl-dolap-iid-1721432560",
		"scrapedAt": "2026-01-25T10:13:54.628Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9912649989128113
	},
	{
		"id": "1723343946",
		"title": "Siyah Geni\u015f Bez Dolap\n",
		"price": "350 TL",
		"location": "\u0130stanbul, Bah\u00e7elievler",
		"image": "https://imvm.letgo.com/v1/files/a2ebd7d85de84-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/siyah-genis-bez-dolap-iid-1723343946",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9962311387062073
	},
	{
		"id": "1723610232",
		"title": "kuma\u015f gard\u0131rop\n",
		"price": "200 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/fccb7b79df474-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/kumas-gardrop-iid-1723610232",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9681908488273621
	},
	{
		"id": "1723610261",
		"title": "Genis Temiz Bez Dolap\n",
		"price": "400 TL",
		"location": "\u0130stanbul, B\u00fcy\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/a1f449a9ef564-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/genis-temiz-bez-dolap-iid-1723610261",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9971877932548523
	},
	{
		"id": "1723940748",
		"title": "Dolap aynali\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/d0c21bc1a6fa4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-aynali-iid-1723940748",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9332330822944641
	},
	{
		"id": "1723718883",
		"title": "4 kapakl\u0131 lake dolap\n",
		"price": "36 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/088dacdb24914-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/4-kapakl-lake-dolap-iid-1723718883",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9900890588760376
	},
	{
		"id": "970448608",
		"title": "yatak odas\u0131 dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/016r2mksmhsn2-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/yatak-odas-dolap-iid-970448608",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9910529255867004
	},
	{
		"id": "1718793224",
		"title": "Dolap kapaklar\u0131 b\u00fct\u00fcn detaylar a\u00e7\u0131klamada\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/c1b14552746d4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-kapaklar-butun-detaylar-acklamada-iid-1718793224",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9715007543563843
	},
	{
		"id": "1714510512",
		"title": "AYNALI GARDOLAP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, K\u00fc\u00e7\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/2b168d1674234-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/aynali-gardolap-iid-1714510512",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9929227828979492
	},
	{
		"id": "1709894071",
		"title": "GARDOLAP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, K\u00fc\u00e7\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/1719077ab82e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/gardolap-iid-1709894071",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9948951601982117
	},
	{
		"id": "938289523",
		"title": "beyaz Gard\u0131rop\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/m3clsqggh4821-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/beyaz-gardrop-iid-938289523",
		"scrapedAt": "2026-01-25T10:13:54.629Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9955339431762695
	},
	{
		"id": "1718819338",
		"title": "dolap AC\u0130L SATILIK\n",
		"price": "400 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/ce797dfbd0934-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-acil-satilik-iid-1718819338",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.986270546913147
	},
	{
		"id": "1723274440",
		"title": "FUL MDF 6 KAPILI DOLAP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/62120f054ec44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ful-mdf-6-kapili-dolap-iid-1723274440",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9832889437675476
	},
	{
		"id": "1722977043",
		"title": "ahsap cita giysi dolap\n",
		"price": "300 TL",
		"location": "\u0130stanbul, Maltepe",
		"image": "https://imvm.letgo.com/v1/files/f20310f946504-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ahsap-cita-giysi-dolap-iid-1722977043",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9997492432594299
	},
	{
		"id": "1721269338",
		"title": "temiz kullan\u0131lm\u0131\u015f kullan\u0131\u015fl\u0131 dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Ata\u015fehir",
		"image": "https://imvm.letgo.com/v1/files/b75b49c05b9e4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/temiz-kullanlms-kullansl-dolap-iid-1721269338",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.896459698677063
	},
	{
		"id": "1723007105",
		"title": "DOLAP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Kartal",
		"image": "https://imvm.letgo.com/v1/files/f44dfd85b5aa4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-iid-1723007105",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9979550838470459
	},
	{
		"id": "1722988425",
		"title": "FULL MDF\u27576 KAPAKLI DOLAP\u2757\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Gaziosmanpa\u015fa",
		"image": "https://imvm.letgo.com/v1/files/9679a7d707114-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/full-mdf6-kapakli-dolap-iid-1722988425",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9995860457420349
	},
	{
		"id": "1722840941",
		"title": "Gardrop\n",
		"price": "400 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/fe124ad858004-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/gardrop-iid-1722840941",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9946802258491516
	},
	{
		"id": "1722912208",
		"title": "\u00dcCRETS\u0130Z GARDROP\n",
		"price": "1 TL",
		"location": "\u0130stanbul, K\u00fc\u00e7\u00fck\u00e7ekmece",
		"image": "https://imvm.letgo.com/v1/files/19b9079c1ca14-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ucretsiz-gardrop-iid-1722912208",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.996657133102417
	},
	{
		"id": "1625995801",
		"title": "lake s\u00fcrg\u00fcl\u00fc dolap imaltdan\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/39e454rddb1j2-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/lake-surgulu-dolap-imaltdan-iid-1625995801",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9804633259773254
	},
	{
		"id": "932460279",
		"title": "lake beyaz k\u00f6\u015fe dolap\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/xt45gtqs7qdp-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/lake-beyaz-kose-dolap-iid-932460279",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.998084545135498
	},
	{
		"id": "1721204281",
		"title": "S\u00dcRG\u00dcL\u00dc DOLAP 140x200 160x200 180x200 200x200\n",
		"price": "5 TL",
		"location": "\u0130stanbul, Sultangazi",
		"image": "https://imvm.letgo.com/v1/files/febd3fd765fb4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/surgulu-dolap-140x200-160x200-180x200-200x200-iid-1721204281",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9951109290122986
	},
	{
		"id": "1621197648",
		"title": "2 kapakl\u0131 dolap\n",
		"price": "350 TL",
		"location": "\u0130stanbul, Esenler",
		"image": "https://imvm.letgo.com/v1/files/fn9iyeyuyvcy1-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/2-kapakl-dolap-iid-1621197648",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.979272723197937
	},
	{
		"id": "943612076",
		"title": "Dolap \u00f6zel \u00f6l\u00e7\u00fc yap\u0131l\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/zxvpge54tmao1-LETTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-ozel-olcu-yaplr-iid-943612076",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9989919066429138
	},
	{
		"id": "1637684177",
		"title": "imalatdan beyaz yatak odas\u0131 dolap\u0131\n",
		"price": "1 TL",
		"location": "\u0130stanbul, \u00dcmraniye",
		"image": "https://imvm.letgo.com/v1/files/ahafq4yc9r973-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/imalatdan-beyaz-yatak-odas-dolap-iid-1637684177",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.995452880859375
	},
	{
		"id": "1663967104",
		"title": "Dolap \u00e7e\u015fitleri\n",
		"price": "123 TL",
		"location": "\u0130stanbul, Beylikd\u00fcz\u00fc",
		"image": "https://imvm.letgo.com/v1/files/bwq6nwg0v90b1-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-cesitleri-iid-1663967104",
		"scrapedAt": "2026-01-25T10:13:54.630Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9831589460372925
	},
	{
		"id": "1720908411",
		"title": "PRADO PORTAT\u0130F BEZ DOLAP\n",
		"price": "300 TL",
		"location": "4.8 ",
		"image": "https://imvm.letgo.com/v1/files/2c4c30e286a44-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/prado-portatif-bez-dolap-iid-1720908411",
		"scrapedAt": "2026-01-25T10:13:54.631Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.8637517690658569
	},
	{
		"id": "1698517811",
		"title": "dolap ful mdf \u00fcr\u00fcnler\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/0d6342d252ba4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-ful-mdf-urunler-iid-1698517811",
		"scrapedAt": "2026-01-25T10:13:54.631Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9817878007888794
	},
	{
		"id": "1670708029",
		"title": "Dolap 3 kapakl yap\u0131l\u0131r 4 kapak yap\u0131l\u0131r 5 kapak ypa\u0131l\u0131r\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sultanbeyli",
		"image": "https://imvm.letgo.com/v1/files/s62267q0s2wr2-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-3-kapakl-yaplr-4-kapak-yaplr-5-kapak-ypalr-iid-1670708029",
		"scrapedAt": "2026-01-25T10:13:54.631Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9920137524604797
	},
	{
		"id": "1693030673",
		"title": "dolap giysi ful mdf\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sultanbeyli",
		"image": "https://imvm.letgo.com/v1/files/4b4462de85bb4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-giysi-ful-mdf-iid-1693030673",
		"scrapedAt": "2026-01-25T10:13:54.631Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.9948974251747131
	},
	{
		"id": "1714446354",
		"title": "Dolap mdf ful\n",
		"price": "1 TL",
		"location": "\u0130stanbul, Sancaktepe",
		"image": "https://imvm.letgo.com/v1/files/ecca862199224-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/dolap-mdf-ful-iid-1714446354",
		"scrapedAt": "2026-01-25T10:13:54.631Z",
		"verified_agent": "AGENT_09_WARDROBE",
		"confidence_score": 0.997204065322876
	},
	{
		"id": "1723275322",
		"title": "ikea mamut sandalye\n",
		"price": "299 TL",
		"location": "\u0130stanbul, Avc\u0131lar",
		"image": "https://imvm.letgo.com/v1/files/9fbf23b54a9c4-OLXAUTOTR/image;s=640x640",
		"link": "https://www.letgo.com/item/ikea-mamut-sandalye-iid-1723275322",
		"scrapedAt": "2026-01-25T10:13:41.610Z",
		"verified_agent": "AGENT_06_TABLE",
		"confidence_score": 0.8676657676696777
	}
];
// 👆 ----------------------- 👆

async function harvestDetails() {
	if (RAW_DATA.length === 0) {
		alert("Lütfen scriptin başındaki RAW_DATA kısmına veriyi yapıştırdığınızdan emin olun!");
		return;
	}

	console.log(`🚀 İşlem Başlıyor: ${RAW_DATA.length} adet ilan taranacak...`);

	const results = [];
	const removed = [];

	// Helper: Delay function to mimic human behavior
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	// Helper: HTML Fetcher
	async function fetchPage(url) {
		try {
			const res = await fetch(url);
			if (!res.ok) return null;
			const text = await res.text();
			const parser = new DOMParser();
			return parser.parseFromString(text, 'text/html');
		} catch (e) {
			return null;
		}
	}

	// Helper: Text Analyzer
	function analyzeDescription(desc, price) {
		if (!desc) return { isSafe: true, reason: 'No Desc' };

		const lowerDesc = desc.toLowerCase();

		// 🚩 RED FLAGS (Bunlar varsa %99 ihtimalle sahte fiyat)
		const redFlags = [
			'fiyat temsili',
			'temsili fiyat',
			'fiyat sondur',
			'adet fiyatı',
			'tane fiyatı',
			'fiyat için',
			'fiyat bilgisi için',
			'tl dir',
			'tl\'dir',
			'bin tl',
			'000 tl', // 1000 tl, 5000 tl gibi
			'00 tl', // 500 tl gibi
		];

		// Açıklamayı temizle, sadece sayıları ve anahtar kelimeleri bırak
		// Basit kontrol: Açıklamada geçen en büyük sayıyı bul (Yıl hariç: 2020, 2024 vb.)
		const numbers = lowerDesc.match(/\d+/g);
		let maxNumber = 0;
		if (numbers) {
			numbers.forEach(num => {
				const val = parseInt(num);
				// Yıl veya telefon numarası olma ihtimalini ele (basitçe)
				if (val > 300 && val < 19000 && val !== 2023 && val !== 2024 && val !== 2025) {
					if (val > maxNumber) maxNumber = val;
				}
			});
		}

		// Karar Mekanizması

		// 1. Yasaklı kelime var mı?
		for (const flag of redFlags) {
			if (lowerDesc.includes(flag)) {
				return { isSafe: false, reason: `Yasaklı Kelime: "${flag}"` };
			}
		}

		// 2. Fiyat 50 TL altı ama açıklamada 500+ sayı geçiyor mu?
		const currentPriceVal = parseInt(price.replace(/\D/g, '') || '0');
		if (currentPriceVal < 50 && maxNumber > 500) {
			return { isSafe: false, reason: `Şüpheli Fiyat: Başlık ${currentPriceVal}TL ama açıklama ${maxNumber} içeriyor.` };
		}

		return { isSafe: true, description: desc };
	}

	// MAIN LOOP
	let processed = 0;

	for (const item of RAW_DATA) {
		processed++;
		console.log(`[${processed}/${RAW_DATA.length}] İnceleniyor: ${item.title}`);

		// Rastgele bekleme (1.5 - 3.5 sn arası)
		await sleep(1500 + Math.random() * 2000);

		const doc = await fetchPage(item.link);

		let description = "";
		let newPrice = item.price;
		let isSold = false;

		if (doc) {
			// 1. Açıklamayı Bul
			// JSON-LD verisi en temizidir
			const ldJson = doc.querySelector('script[type="application/ld+json"]');
			if (ldJson) {
				try {
					const json = JSON.parse(ldJson.textContent);
					if (json.description) description = json.description;
					if (json.offers && json.offers.price) newPrice = `${json.offers.price} ${json.offers.priceCurrency}`;
				} catch (e) { }
			}

			// Fallback: Meta description
			if (!description) {
				const metaDesc = doc.querySelector('meta[name="description"]');
				if (metaDesc) description = metaDesc.content;
			}

			// Fallback: Data-testid
			if (!description) {
				const descDiv = doc.querySelector('[data-testid="description"]');
				if (descDiv) description = descDiv.innerText;
			}

			// Satıldı mı kontrolü
			if (doc.body.innerText.includes('Bu ilan artık aktif değil') || doc.body.innerText.includes('Satıldı')) {
				isSold = true;
			}
		} else {
			console.warn("   ⚠️ Sayfa çekilemedi, atlanıyor.");
			// Yine de güvenli listeye ekleyelim mi? Hayır, riskli. Eski veriyi koru.
		}

		const analysis = analyzeDescription(description, newPrice);

		if (isSold) {
			removed.push({ ...item, reason: "SATILDI" });
			console.log("   ❌ SATILMIŞ");
		} else if (!analysis.isSafe) {
			removed.push({ ...item, reason: analysis.reason, real_desc: description });
			console.log(`   ⛔ ELENDİ: ${analysis.reason}`);
		} else {
			// GÜVENLİ - Güncellenmiş veriyle ekle
			results.push({
				...item,
				description: description.substring(0, 200) + "...", // Çok uzun olmasın
				price: newPrice, // Fiyatı güncelle (belki değişmiştir)
				last_checked: new Date().toISOString()
			});
			console.log("   ✅ ONAYLANDI");
		}
	}

	// SONUÇLARI İNDİR
	console.log("\n🎉 İşlem Tamamlandı!");
	console.log(`Toplam: ${RAW_DATA.length} | Kalan: ${results.length} | Silinen: ${removed.length}`);

	// Yeni veriyi indir
	const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'verified_data_clean.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

// Fonksiyonu başlat
harvestDetails();
