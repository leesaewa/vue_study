<template>
  <div class="tab-container">
    <ul class="tabs">
      <li
        v-for="tab in tabItem"
        :key="tab.id"
        :class="{ active: tab.id === isActive }"
      >
        <button type="button" @click="handleSelected(tab.id)">
          {{ tab.title }}
        </button>
      </li>
    </ul>

    <section class="tab-cont">
      <div v-if="isActive === 1">
        <img
          :src="require(`@/assets/${tabItem[0].img}`)"
          :alt="`${tabItem[0].title}`"
        />
        <h2>{{ tabItem[0].title }}</h2>
        <p>
          The Siberian tiger, or Amur tiger, is a population of the tiger
          subspecies Panthera tigris tigris native to the Russian Far East,
          Northeast China and possibly North Korea. It once ranged throughout
          the Korean Peninsula, but currently inhabits mainly the Sikhote-Alin
          mountain region in southwest Primorye Province in the Russian Far
          East. In 2005, there were 331–393 adult and subadult Siberian tigers
          in this region, with a breeding adult population of about 250
          individuals. The population had been stable for more than a decade
          because of intensive conservation efforts, but partial surveys
          conducted after 2005 indicate that the Russian tiger population was
          declining. An initial census held in 2015 indicated that the Siberian
          tiger population had increased to 480–540 individuals in the Russian
          Far East, including 100 cubs. This was followed up by a more detailed
          census which revealed there was a total population of 562 wild
          Siberian tigers in Russia. As of 2014, about 35 individuals were
          estimated to range in the international border area between Russia and
          China.
        </p>
      </div>
      <div class="" v-if="isActive === 2">
        <img
          :src="require(`@/assets/${tabItem[1].img}`)"
          :alt="`${tabItem[1].title}`"
        />
        <h2>{{ tabItem[1].title }}</h2>
        <p>
          The humpback whale (Megaptera novaeangliae) is a species of baleen
          whale. It is a rorqual (a member of the family Balaenopteridae) and is
          the only species in the genus Megaptera. Adults range in length from
          14–17 m (46–56 ft) and weigh up to 40 metric tons (44 short tons). The
          humpback has a distinctive body shape, with long pectoral fins and
          tubercles on its head. It is known for breaching and other distinctive
          surface behaviors, making it popular with whale watchers. Males
          produce a complex song typically lasting 4 to 33 minutes.
        </p>
      </div>
      <div class="" v-if="isActive === 3">
        <img
          :src="require(`@/assets/${tabItem[2].img}`)"
          :alt="`${tabItem[2].title}`"
        />
        <h2>{{ tabItem[2].title }}</h2>
        <p>
          The wolf (Canis lupus; pl: wolves), also known as the gray wolf or
          grey wolf, is a large canine native to Eurasia and North America. More
          than thirty subspecies of Canis lupus have been recognized, including
          the dog and dingo, though gray wolves, as popularly understood, only
          comprise naturally-occurring wild subspecies. The wolf is the largest
          extant member of the family Canidae, and is further distinguished from
          other Canis species by its less pointed ears and muzzle, as well as a
          shorter torso and a longer tail. The wolf is nonetheless related
          closely enough to smaller Canis species, such as the coyote and the
          golden jackal, to produce fertile hybrids with them. The wolf's fur is
          usually mottled white, brown, gray, and black, although subspecies in
          the arctic region may be nearly all white.<br />
          The global wild wolf population was estimated to be 300,000 in 2003
          and is considered to be of Least Concern by the International Union
          for Conservation of Nature (IUCN).
        </p>
      </div>
      <div class="" v-if="isActive === 4">
        <img
          :src="require(`@/assets/${tabItem[3].img}`)"
          :alt="`${tabItem[3].title}`"
        />
        <h2>{{ tabItem[3].title }}</h2>
        <p>
          The polar bear (Ursus maritimus) is a large bear native to the Arctic
          and surrounding areas. It is closely related to the brown bear, and
          the two species can interbreed. The polar bear is the largest extant
          species of bear and land carnivore, with adult males weighing 300–800
          kg (700–1,800 lb). The species is sexually dimorphic, as adult females
          are much smaller. The polar bear is white- or yellowish-furred with
          black skin and a thick layer of fat. It is more slender than the brown
          bear, with a narrower skull, longer neck and lower shoulder hump. Its
          teeth are sharper and more adapted to cutting meat. The paws are large
          and allow the bear to walk on ice and paddle in the water.<br />The
          polar bear is considered to be a vulnerable species by the
          International Union for Conservation of Nature (IUCN). Its biggest
          threats are climate change, pollution and oil/gas development. Climate
          change has caused a decline in sea ice, giving the polar bear less
          access to its favoured prey and increasing the risk of malnutrition
          and starvation. Less sea ice also means that the bears must spend more
          time on land, increasing conflicts with people.
        </p>
      </div>
      <div class="" v-if="isActive === 5">
        <img
          :src="require(`@/assets/${tabItem[4].img}`)"
          :alt="`${tabItem[4].title}`"
        />
        <h2>{{ tabItem[4].title }}</h2>
        <p>
          Foxes are small to medium-sized, omnivorous mammals belonging to
          several genera of the family Canidae. They have a flattened skull,
          upright, triangular ears, a pointed, slightly upturned snout, and a
          long bushy tail ("brush").<br />
          Twelve species belong to the monophyletic "true fox" group of genus
          Vulpes. Approximately another 25 current or extinct species are always
          or sometimes called foxes; these foxes are either part of the
          paraphyletic group of the South American foxes, or of the outlying
          group, which consists of the bat-eared fox, gray fox, and island
          fox.<br />
          Foxes live on every continent except Antarctica. The most common and
          widespread species of fox is the red fox (Vulpes vulpes) with about 47
          recognized subspecies. The global distribution of foxes, together with
          their widespread reputation for cunning, has contributed to their
          prominence in popular culture and folklore in many societies around
          the world. The hunting of foxes with packs of hounds, long an
          established pursuit in Europe, especially in the British Isles, was
          exported by European settlers to various parts of the New World.
        </p>
      </div>
      <div class="" v-if="isActive === 6">
        <img
          :src="require(`@/assets/${tabItem[5].img}`)"
          :alt="`${tabItem[5].title}`"
        />
        <h2>{{ tabItem[5].title }}</h2>
        <p>
          The red panda (Ailurus fulgens), also known as the lesser panda, is a
          small mammal native to the eastern Himalayas and southwestern China.
          It has dense reddish-brown fur with a black belly and legs,
          white-lined ears, a mostly white muzzle and a ringed tail. Its
          head-to-body length is 51–63.5 cm (20.1–25.0 in) with a 28–48.5 cm
          (11.0–19.1 in) tail, and it weighs between 3.2 and 15 kg (7.1 and 33.1
          lb). It is well adapted to climbing due to its flexible joints and
          curved semi-retractile claws.<br />The red panda inhabits coniferous
          forests as well as temperate broadleaf and mixed forests, favouring
          steep slopes with dense bamboo cover close to water sources. It is
          solitary and largely arboreal. It feeds mainly on bamboo shoots and
          leaves, but also on fruits and blossoms. Red pandas mate in early
          spring, with the females giving birth to litters of up to four cubs in
          summer. It is threatened by poaching as well as destruction and
          fragmentation of habitat due to deforestation. The species has been
          listed as Endangered on the IUCN Red List since 2015. It is protected
          in all range countries.
        </p>
      </div>
      <div class="" v-if="isActive === 7">
        <img
          :src="require(`@/assets/${tabItem[6].img}`)"
          :alt="`${tabItem[6].title}`"
        />
        <h2>{{ tabItem[6].title }}</h2>
        <p>
          The giant panda (Ailuropoda melanoleuca, sometimes panda bear or
          simply panda) is a bear species endemic to China. It is characterised
          by its bold black-and-white coat and rotund body. The name "giant
          panda" is sometimes used to distinguish it from the red panda, a
          neighboring musteloid. Though it belongs to the order Carnivora, the
          giant panda is a folivore, with bamboo shoots and leaves making up
          more than 99% of its diet. Giant pandas in the wild occasionally eat
          other grasses, wild tubers, or even meat in the form of birds,
          rodents, or carrion. In captivity, they may receive honey, eggs, fish,
          yams, shrub leaves, oranges, or bananas along with specially prepared
          food.<br />
          By March 2015, the wild giant panda population had increased to 1,864
          individuals. In 2016, it was reclassified on the IUCN Red List from
          "endangered" to "vulnerable", affirming decade-long efforts to save
          the panda. In July 2021, Chinese authorities also reclassified the
          giant panda as vulnerable.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "TabList",

  data() {
    return {
      tabItem: [
        { id: 1, img: "tiger.jpg", title: "Siberian Tiger" },
        { id: 2, img: "whale.jpg", title: "Humpback whale" },
        { id: 3, img: "wolf.jpg", title: "Wolf" },
        { id: 4, img: "polar_bear.jpg", title: "Polar bear" },
        { id: 5, img: "fox.jpg", title: "Fox" },
        { id: 6, img: "red_panda.jpg", title: "Red Panda" },
        { id: 7, img: "panda.jpg", title: "Panda" },
      ],
      isActive: 1,
    };
  },

  methods: {
    handleSelected(id) {
      this.isActive = id;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Raleway&display=swap");

.tab-container {
  font-family: "Raleway", sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
}
.tab-container .tabs {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f8f0e5;
}
.tab-container .tabs li {
  width: 100%;
}
.tab-container .tabs li.active {
  background-color: #102c57;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.tab-container .tabs li button {
  all: unset;
  display: block;
  cursor: pointer;
  width: 100%;
  padding: 20px 0;
}
.tab-container .tab-cont {
  background-color: #102c57;
  padding: 30px;
  color: #fff;
}
.tab-container .tab-cont h2 {
  font-family: "Anton", sans-serif;
  border-bottom: 1px solid #f8f0e5;
  padding-bottom: 2rem;
  letter-spacing: 2px;
  font-size: 2em;
}
.tab-container .tab-cont img {
  border-radius: 20px;
  width: 100%;
  height: 70vh;
  object-fit: cover;
  vertical-align: bottom;
}
.tab-container .tab-cont p {
  text-align: left;
  font-size: 1.2rem;
  line-height: 2rem;
}
</style>
