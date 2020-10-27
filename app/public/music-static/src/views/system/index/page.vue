<!--
 * @Author: your name
 * @Date: 2020-06-29 18:45:16
 * @LastEditTime: 2020-10-25 21:57:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \music-static\src\views\system\index\page.vue
-->
<template>
  <d2-container class="page " type="ghost" better-scroll>
    <template slot="header">首頁</template>
    <div class="d2-p-10  m-container m-i-c1">
      <el-card class="d2-card d2-mr">
        <div class="description">
          <p class="description-title d2-m-0">
            <i class="fa fa-user m-icon" aria-hidden="true"></i>用户总数
          </p>
          <d2-count-up
            :decimals="2"
            :end="dashboardNumber.user"
            :duration="0.5"
            :callback="
              () => {
                user.show = true;
              }
            "
            class="description-num"
          />
          位
          <ve-bar
            v-if="user.show"
            :data="user.userChartData"
            height="150px"
            :extend="user.userChartExtend"
            :legend-visible="false"
          ></ve-bar>
        </div>
        <div class="charts"></div>
      </el-card>
      <el-card class="d2-card d2-mr">
        <p class="description-title d2-m-0">
          <i class="fa fa-play-circle m-icon" aria-hidden="true"></i>歌单总数
        </p>
        <d2-count-up
          :decimals="2"
          :end="dashboardNumber.songList"
          :duration="0.5"
          class="description-num"
          :callback="
            () => {
              songList.show = true;
            }
          "
        />
        个
        <ve-line
          v-if="user.show"
          :data="songList.songListChartData"
          :settings="songList.songListChartSettings"
          :extend="songList.songListChartExtend"
          height="170px"
          :legend-visible="false"
        ></ve-line>
      </el-card>
      <el-card class="d2-card d2-mr">
        <p class="description-title d2-m-0">
          <i class="fa fa-percent m-icon" aria-hidden="true"></i>调用次数
        </p>
        <d2-count-up
          :decimals="2"
          :end="dashboardNumber.used"
          :duration="0.5"
          class="description-num"
          :callback="
            () => {
              used.show = true;
            }
          "
        />
        次
        <ve-line
          v-if="user.show"
          :data="used.usedChartData"
          :settings="used.usedChartSettings"
          :extend="used.usedChartExtend"
          height="170px"
          :legend-visible="false"
        ></ve-line>
      </el-card>
      <el-card class="d2-card">
        <p class="description-title d2-m-0">
          <i class="fa fa-bar-chart m-icon" aria-hidden="true"></i>域名授权量
        </p>
        <d2-count-up
          :decimals="2"
          :end="dashboardNumber.domain"
          :duration="0.5"
          class="description-num"
          :callback="
            () => {
              domain.show = true;
            }
          "
        />
        个
        <ve-histogram
          v-if="user.show"
          :data="domain.domainChartData"
          height="150px"
          :legend-visible="false"
          :extend="domain.domainChartExtend"
        ></ve-histogram>
      </el-card>
    </div>
    <div class="d2-p-10  m-container">
      <el-card class="d2-card d2-mr-20 h-440 ">
        <el-table
          v-infinite-scroll="load"
          :data="table.tableData"
          style="width: 100%;min-height: 380px"
          infinite-scroll-delay="1000"
          :infinite-scroll-disabled="table.disabled"
        >
          <el-table-column prop="username" label="用户名">
            <template slot-scope="scope">
              <div class="user-name">
                <el-avatar> {{ scope.row.username[0] }} </el-avatar
                >{{ scope.row.username }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="账户状态">
            <template slot-scope="scope">
              <el-tag :type="+scope.row.state !== 0 ? 'success' : 'danger'">
                {{ +scope.row.state !== 0 ? "正常" : "封禁" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="role" label="角色"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="lastTime" label="最后登录时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.lastTime).toLocaleString() }}
            </template>
          </el-table-column>
          <template slot="empty">
            <p class="m-noneData">没有数据</p>
          </template>
          <template slot="append">
            <p
              class="m-loading"
              element-loading-text="拼命加载中"
              v-loading="table.loading"
              element-loading-spinner="el-icon-loading"
              v-if="!table.end && table.loading"
            ></p>
            <p class="m-loading" v-if="table.end && table.tableData.length">
              已经到最底了!
            </p>
          </template>
        </el-table>
      </el-card>
      <el-card class="d2-card m-m-w">
        <ve-ring
          :data="userDesc.userDescChartData"
          :settings="userDesc.userDescChartSettings"
          :extend="userDesc.userDescChartExtend"
        ></ve-ring>
      </el-card>
    </div>
    <div class="d2-p-10  m-container">
      <el-card class="d2-card m-m-w h-440">
        <el-timeline>
          <el-timeline-item timestamp="2020-10-14" placement="top">
            <el-card>
              <p>2020-10-14</p>
              <h4>aggregateMusic 1.0 Demo 初步完成</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card class="d2-card d2-ml-20">
        <ve-wordcloud
          :data="word.wordChartData"
          :settings="word.wordChartSetting"
          :extend="word.wordChartExtend"
        ></ve-wordcloud>
      </el-card>
    </div>
    <!-- <div class="d2-p-10  m-container">
      <el-card class="d2-card d2-mr-10"> </el-card>
      <el-card class="d2-card d2-ml-10"> </el-card>
    </div> -->
  </d2-container>
</template>

<script>
import list from "@/plugin/charts/list/_mixin/list.js";
export default {
  name: "index",
  async created() {
    this.table.loading = true;
    const res = await Promise.all([
      this.$api.SYS_USER_LIST(),
      this.$api.SYS_DASHBOARD_DATA(),
      this.$api.SYS_WORDS_DATA()
    ]);
    this.setDashBoard(res[1]);
    this.setUser(res[0]);
    this.setWords(res[2]);
    this.table.loading = false;
  },
  components: {},
  methods: {
    setWords(data) {
      this.word.wordChartData.rows = Object.keys(data).map(item => {
        return { word: item, count: data[item] };
      });
    },
    async load() {
      this.table.loading = true;
      const res = await this.$api.SYS_USER_LIST((this.page += 1));
      if (!res.data.length) {
        this.$message("到最底了!");
        this.table.loading = false;
        this.table.end = true;
        return (this.table.disabled = true);
      }
      this.table.tableData = this.table.tableData.concat(res.data);
      this.$nextTick(() => {
        this.table.loading = false;
      });
      this.table.disabled = false;
    },
    setDashBoard(data) {
      if (!data) return;
      this.user.userChartData.rows = Object.keys(data.users).map(item => {
        const current = data.users[item];
        return {
          日期: item,
          已激活: current.state1,
          未激活: current.state0
        };
      });
      const songMaxVal = Object.keys(data.playlist);
      if (songMaxVal.length) {
        this.dashboardNumber.songList =
          data.playlist[songMaxVal[songMaxVal.length - 1]];
        this.songList.songListChartData.rows = songMaxVal.map(item => {
          const current = data.playlist[item];
          return {
            日期: item,
            歌单数: current
          };
        });
      }
      const domainMaxVal = Object.keys(data.domain);
      if (domainMaxVal.length) {
        this.dashboardNumber.domain =
          data.domain[domainMaxVal[domainMaxVal.length - 1]];
        this.domain.domainChartData.rows = domainMaxVal.map(item => {
          const current = data.domain[item];
          return {
            日期: item,
            授权量: current
          };
        });
      }

      const usedMaxVal = Object.keys(data.used);
      if (usedMaxVal.length) {
        this.dashboardNumber.used =
          data.used[usedMaxVal[usedMaxVal.length - 1]];
        this.used.usedChartData.rows = usedMaxVal.map(item => {
          const current = data.used[item];
          console.log(current);
          return {
            日期: item,
            访问用户: current
          };
        });
      }
    },
    setUser(data) {
      this.dashboardNumber.user = data.count;
      this.table.tableData = data.data;
      const dashboard = Object.keys(data.sumRole).map((item, i) => {
        return {
          role: item,
          value: data.sumRole[item]
        };
      });
      this.userDesc.userDescChartData.rows = dashboard;
      console.log(data.sumRole);
    }
  },
  data() {
    return {
      page: 0,
      disabled: false,
      dashboardNumber: {
        user: 0,
        used: 0,
        songList: 0,
        domain: 0
      },
      word: {
        wordChartExtend: {},
        wordChartSetting: {
          sizeMax: 35
        },
        wordChartData: {
          columns: ["word", "count"],
          rows: []
        }
      },
      table: {
        tableData: [],
        loading: false,
        disabled: false,
        end: false
      },
      userDesc: {
        userDescChartExtend: {
          // legend: {
          //   orient: "top",
          //   left: "75%", //图例距离左的距离
          //   y: "center", //图例上下居中
          //   formatter: name => {
          //     let data = JSON.parse(
          //       JSON.stringify(this.userDesc.userDescChartData)
          //     ).rows;
          //     const itemValueArr = data.filter(el => el.role == name);
          //     const itemValueAll = data.reduce((total, num) => {
          //       return total + Math.round(num.value);
          //     }, 0);
          //     return `${name}（${(
          //       (itemValueArr[0].value / itemValueAll) *
          //       100
          //     ).toFixed(2)}%）`;
          //   }
          // }
        },
        userDescChartData: {
          columns: ["role", "value"],
          rows: []
        }
      },
      domain: {
        show: false,
        domainChartData: {
          columns: ["日期", "授权量"],
          rows: [
            // { 日期: "1/1", 数量: 1393 },
            // { 日期: "1/2", 数量: 3530 },
            // { 日期: "1/3", 数量: 2923 },
            // { 日期: "1/4", 数量: 1723 },
            // { 日期: "1/5", 数量: 17213 }
          ]
        },
        domainChartExtend: {
          color: {
            type: "bar",
            x: 1,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#19D4AE" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#4cfdff" // 100% 处的颜色
              }
            ]
          },
          animationEasing: "quadraticInOut",
          tooltip: {
            show: true,
            formatter:
              '{b}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-image:linear-gradient(to right,#19D4AE, #4cfdff)"></span>{a0}:{c0}'
          },
          xAxis: {
            axisLine: {
              show: false
            },
            type: "category",

            axisTick: {
              show: false,
              length: 9,
              alignWithLabel: false,
              lineStyle: {
                color: "#7DFFFD"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          },
          grid: {
            x: "-4%",
            y: 0,
            x2: "-4%",
            y2: 0
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          }
        }
      },
      user: {
        show: false,
        userChartData: {
          columns: ["日期", "已激活", "未激活"],
          rows: []
        },
        userChartExtend: {
          animationEasing: "quadraticInOut",
          xAxis: {
            axisLine: {
              show: false
            },

            axisTick: {
              show: false,
              length: 9,
              alignWithLabel: false,
              lineStyle: {
                color: "#7DFFFD"
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          },
          grid: {
            x: "0%",
            y: 0,
            x2: "0%",
            y2: 0
          },
          yAxis: {
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          }
        }
      },
      used: {
        show: false,
        usedChartSettings: {
          area: true
        },
        usedChartExtend: {
          animationEasing: "quadraticInOut",
          series: {
            lineStyle: {
              color: "#5AB1EF"
            },
            areaStyle: {
              color: "#5ab1ef21"
            },
            itemStyle: {
              color: "#5ab1ef",
              borderColor: "#5ab1ef"
            }
          },
          xAxis: {
            type: "category",
            axisLine: {
              show: false,
              lineStyle: {
                color: "white"
              }
            },
            axisTick: {
              show: false,
              length: 9,
              alignWithLabel: true,
              lineStyle: {
                color: "#7DFFFD"
              }
            },

            axisLabel: {
              show: true,
              fontSize: 16
            }
          },
          grid: {
            x: "-8%",
            y: "4%",
            x2: "-8%",
            y2: 0
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          }
        },
        usedChartData: {
          columns: ["日期", "访问用户"],
          rows: []
        }
      },
      songList: {
        show: false,
        songListChartSettings: {
          area: true
        },
        songListChartExtend: {
          animationEasing: "quadraticInOut",
          series: {
            areaStyle: {
              color: "#19d4ae36"
            }
          },
          xAxis: {
            type: "category",
            axisLine: {
              show: false,
              lineStyle: {
                color: "white"
              }
            },
            axisTick: {
              show: false,
              length: 9,
              alignWithLabel: true,
              lineStyle: {
                color: "#7DFFFD"
              }
            },
            axisLabel: {
              show: true,
              fontSize: 16
            }
          },
          grid: {
            x: "-8%",
            y: "4%",
            x2: "-8%",
            y2: 0
          },
          yAxis: {
            type: "value",
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              fontSize: 16
            }
          }
        },
        songListChartData: {
          columns: ["日期", "歌单数"],
          rows: []
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.page {
  .m-i-c1 .d2-card {
    height: 250px;
  }
  .m-container {
    @extend %m-container;
  }
  .m-m-w {
    @include customize-max-w();
  }
  .d2-card {
    @extend %m-card;
  }
  .description-title {
    color: #606266;
  }
  .description-num {
    font-size: 35px;
    font-weight: bold;
  }
  .m-icon {
    margin-right: 10px;
    font-size: 25px;
  }
  .h-440 {
    max-height: 440px;
    overflow: auto;
  }
  .m-loading {
    @extend %m-loading;
  }
  .m-noneData {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 260px;
  }
  // .m-table {
  //   height: 380px;
  // }
  .user-name {
    display: flex;
    align-items: center;
    font-weight: bold;
    & *:first-child {
      font-size: 20px;
      margin-right: 10px;
    }
  }
}
</style>
