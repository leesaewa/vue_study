<template>
  <main>
    <div class="content"></div>

    <div class="table" ref="fixedTable">
      <table>
        <thead :class="{ fixed: isFixed }">
          <tr>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
            <th>e</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content"></div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    this.fixedTable = this.$refs.fixedTable;
    this.thead = this.$el.querySelector("thead");
    this.fixedTop =
      this.fixedTable.getBoundingClientRect().top + window.scrollY;

    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isFixed = window.scrollY >= this.fixedTop;
    },
  },
};
</script>

<!-- 다른 방법이지만... 중복으로 fixed가 붙어버림...  -->
<!-- 
<script>
export default {
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    this.fixedTable = this.$refs.fixedTable;
    this.thead = this.$el.querySelector("thead");

    // Create an Intersection Observer
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 1.0, // Fully visible
    });

    // Start observing the thead element
    this.observer.observe(this.thead);
  },
  beforeUnmount() {
    // Disconnect the observer when the component is unmounted
    this.observer.disconnect();
  },
  methods: {
    handleIntersection(entries) {
      // Check if the thead is intersecting with the viewport
      this.isFixed = entries[0].intersectionRatio < 1.0;
    },
  },
};
</script> -->

<style scoped>
.content {
  height: 500px;
  background-color: bisque;
}
.fixed tr {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: blueviolet;
  /* Add any additional styling for the fixed header here */
}
table {
  width: 100%;
  border-collapse: collapse;
  border: 0;
}
td {
  border: 1px solid #eee;
  padding: 8px;
}
</style>

<!--  -->
<!-- // const fixedTable = document.querySelector(".table");
// const thead = document.querySelector("thead");
// const fixedTop = fixedTable.getBoundingClientRect().top + window.scrollY;

// window.addEventListener("scroll", () => {
//   if (window.scrollY >= fixedTop) {
//     thead.classList.add("fixed");
//   } else {
//     thead.classList.remove("fixed");
//   }
// });

// window.addEventListener("scroll", () => {
//   let scroll = document.documentElement.scrollTop; //현재 스크롤바 위치
//   let windowHeight = window.innerHeight; //스크린 창
//   let fullHeight = document.body.scrollHeight; //margin 값 포함 안됨
//   let scrollY = window.scrollY;

//   const fixedTable = document.querySelector(".table");
//   const thead = document.querySelector("thead");

//   let tableTop = fixedTable.offsetTop;
//   console.log("현재 스크롤바", tableTop);
//   // console.log("스크린", windowHeight);
//   // console.log("바디 값", fullHeight);
//   console.log("scroll값", scrollY);

//   if (scrollY >= tableTop) {
//     thead.style.position = "fixed";
//     thead.style.top = "0";
//     thead.style.width = "100%";
//   } else {
//     thead.style.position = "static";
//   }
// });

// window.addEventListener("scroll", () => {
//   // console.log(document.documentElement.scrollTop);
//   const fixedTable = document.querySelector(".table");
//   const thead = document.querySelector("thead");
//   let fullHeight = document.body.scrollHeight; // body height값
//   let tableTop = fixedTable.offsetTop;
//   let scrollY = window.scrollY;
//   let windowHeight = window.innerHeight;

//   let test = windowHeight - tableTop + scrollY;

//   if (scrollY >= test) {
//     thead.style.backgroundColor = "red";
//   }

//   console.log("test", test);
//   // console.log("table top", tableTop);
//   // console.log("full", fullHeight);
// }); -->
