<template>
  <!-- 商品分类导航三级导航栏 -->
  <div class="type-nav">
    <div class="container">
      <div  @mouseenter="showSort" @mouseleave="hiddenSort">
      <h2 class="all">全部商品分类</h2>
      <div class="sort" v-show="show">
        <!-- 通过事件的委派+编程式路由导航实现路由的跳转 -->
        <div class="all-sort-list2" @click="goSearch">
          <!-- 一级分类 -->
          <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
            <h3 @mouseenter="changeIndex(index)" @mouseleave="clearIndex">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <!-- 二级分类 -->
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      // 此属性决定在哪个h3上添加cur类名  
      currentIndex:-1,
      // 三级联动是否显示
      show:true,
    }
  },
  mounted(){
    // 组件挂载完毕通过判断当前url，决定是否一上来就显示三级联动
    if(this.$route.name === 'home'){
      this.show = true;
    }else if(this.$route.name !== 'home'){
      this.show = false;
    }
  },
  computed: {
    // 借助mapState生成计算属性，从state中读取数据。（对象写法）
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数立即执行一次
      // 注入一个参数state --> 即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    changeIndex(index){
      // console.log(index)
      this.currentIndex = index;
    },
    clearIndex(){
      this.currentIndex = -1;
    },
    goSearch(event){
      // event.target.dataset可以获取当前点击的标签的自定义属性
      // console.log(event.target.dataset);
      let {categoryname,category1id,category2id,category3id} = event.target.dataset;
      // 如果标签中存在categoryname属性则说明该标签是a标签
      if(categoryname){
        let location = {name:'search'};
        let query = {categoryName:categoryname};
        if(category1id){
          // 一级分类,动态添加query属性-->传入一级分类的categoryid属性和值
          query.category1Id = category1id;
        }else if(category2id){
          // 二级分类,动态添加query属性-->传入二级分类的categoryid属性和值
          query.category2Id = category2id;
        }else if(category3id){
          // 三级分类,动态添加query属性-->传入三级分类的categoryid属性和值
          query.category3Id = category3id;
        }

        // 拼接push的参数
        location.query = query;
        this.$router.push(location);
      }
    },
    // 鼠标进入
    showSort(){
      if(this.$route.name !== 'home'){
        this.show = true;
      }
    },
    // 鼠标移出
    hiddenSort(){
      if(this.$route.name !== 'home'){
        this.show = false;
      }
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
