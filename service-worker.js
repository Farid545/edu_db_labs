/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4dbd89968198a54eb75e33ba13332eb1"
  },
  {
    "url": "assets/css/0.styles.baa501a4.css",
    "revision": "cefff3f8c27847bd006c320ad3563c8b"
  },
  {
    "url": "assets/img/01.7a9f04b4.png",
    "revision": "7a9f04b43ee23c9a2300c3593be824f7"
  },
  {
    "url": "assets/img/02.fcb969fe.png",
    "revision": "fcb969fea8e98c8801b3db4b6543ab33"
  },
  {
    "url": "assets/img/03.d0caa39c.png",
    "revision": "d0caa39ceaec1be256272691ed9c2cf0"
  },
  {
    "url": "assets/img/04.493e3d46.png",
    "revision": "493e3d46d6a2a57c3bc771a3fcb8db71"
  },
  {
    "url": "assets/img/05.ab0550e3.png",
    "revision": "ab0550e3c87ce1c00dc92efb5c236b3a"
  },
  {
    "url": "assets/img/06.720d8edb.png",
    "revision": "720d8edbee5b4b3c0adc5c0ecd909545"
  },
  {
    "url": "assets/img/07.b86d9806.png",
    "revision": "b86d98066e2362b6fb7b8e95172003e0"
  },
  {
    "url": "assets/img/08.8ff5141d.png",
    "revision": "8ff5141d142db63e22cc8a1b6b59613a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d4f8710e.js",
    "revision": "6b404db6909321274b8c0766fcab0286"
  },
  {
    "url": "assets/js/11.cd73acb7.js",
    "revision": "a1f338796abe60033184676c021a7852"
  },
  {
    "url": "assets/js/12.a78fcacd.js",
    "revision": "251421fa5c2535cadf694c7fc1a5040a"
  },
  {
    "url": "assets/js/13.c3079998.js",
    "revision": "9f9bd739a9d8d0067147c9442d98840a"
  },
  {
    "url": "assets/js/14.d49e5e6c.js",
    "revision": "ff626dbe852c426ef8efa396749586a1"
  },
  {
    "url": "assets/js/15.935737fc.js",
    "revision": "30ab2499d1dfda1982717186995a7921"
  },
  {
    "url": "assets/js/16.67f582d1.js",
    "revision": "90c591b1d94ac06d217b43c9675271c9"
  },
  {
    "url": "assets/js/17.a5c91ccd.js",
    "revision": "f230629e0788486584f05cea969c42e0"
  },
  {
    "url": "assets/js/18.42d71b33.js",
    "revision": "28fe4420abbb4d50792e0babc5b5a460"
  },
  {
    "url": "assets/js/19.4bc6ea83.js",
    "revision": "d947a11f262b741db97581a23d41db4f"
  },
  {
    "url": "assets/js/2.b51be5c1.js",
    "revision": "25d972c91c77d23008ccf680a05c3d7a"
  },
  {
    "url": "assets/js/20.5a9f28a4.js",
    "revision": "ff21f4ea7f239abdd047b1e0e694eaba"
  },
  {
    "url": "assets/js/21.99f85cfe.js",
    "revision": "83bb99f9aac18aa069c999f67f535957"
  },
  {
    "url": "assets/js/22.1c9d10eb.js",
    "revision": "6ade287589d175d9a137551ddbb165ce"
  },
  {
    "url": "assets/js/23.84c265f8.js",
    "revision": "7eef9cf942542c3b4213fe3efa3e5c9b"
  },
  {
    "url": "assets/js/24.65f25b60.js",
    "revision": "e8c399489fa46c5df799f8237e2c448b"
  },
  {
    "url": "assets/js/25.64770f92.js",
    "revision": "72356258d7aaddcf24672b40d2f92e68"
  },
  {
    "url": "assets/js/27.7c443785.js",
    "revision": "ad5a452f0991371b6fd2127a012056bf"
  },
  {
    "url": "assets/js/3.38ecc82b.js",
    "revision": "9e6d8a1d1fe178c9f8874a26d9dd1157"
  },
  {
    "url": "assets/js/4.6efec927.js",
    "revision": "a5635cfd08f1bd732f118aeb604774a2"
  },
  {
    "url": "assets/js/5.f1459669.js",
    "revision": "adf26fb7b36ed36e6f91a2bf61ee9257"
  },
  {
    "url": "assets/js/6.15b30f4a.js",
    "revision": "35e20efc1f7c45d1e603b2f088a5c016"
  },
  {
    "url": "assets/js/7.ecd2bcd0.js",
    "revision": "ddd3736a658ed7ad09591c4ebacefa9c"
  },
  {
    "url": "assets/js/8.d60e56e1.js",
    "revision": "921273f6fd7aa47185c63d8d86e67511"
  },
  {
    "url": "assets/js/9.70d95627.js",
    "revision": "8349caf903b696c3c5fc5d527b9633cc"
  },
  {
    "url": "assets/js/app.352ab085.js",
    "revision": "cf27d3898cbacf29cdb05ad7454a1350"
  },
  {
    "url": "conclusion/index.html",
    "revision": "c7f3398b6c5e4d5812994b57d0778aea"
  },
  {
    "url": "design/index.html",
    "revision": "8c2f9d318be71d9bf3de24e87a0638a4"
  },
  {
    "url": "index.html",
    "revision": "6b1640622dd5ab64f06a65efd2c8dfc7"
  },
  {
    "url": "intro/index.html",
    "revision": "c87ec3e5701bebbdc41016dead2267a7"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "7f05a8c3147a7dfcfec4886ffde02182"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "2d8d0de77dd0875ec8a44a1e5907cc3a"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "06e1679f555b76130062f8a273e309d8"
  },
  {
    "url": "software/index.html",
    "revision": "4042faf4744274db7927c490290d85ba"
  },
  {
    "url": "test/index.html",
    "revision": "c6e008fd6f5f985f1dc91e49a913e41e"
  },
  {
    "url": "test/pic/index.html",
    "revision": "4e0fbe91ab35931063f64e32c9faa9ea"
  },
  {
    "url": "use cases/index.html",
    "revision": "8b512b9a789b419786f720a787477dd8"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
