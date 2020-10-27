import { mapState } from "vuex";
import menuMixin from "../mixin/menu";
import { createMenu } from "../libs/util.menu";
import BScroll from "better-scroll";

export default {
  name: "d2-layout-header-aside-menu-side",
  mixins: [menuMixin],
  render(h) {
    return (
      <div class="d2-layout-header-aside-menu-side">
        <el-menu
          collapse={this.asideCollapse}
          collapseTransition={this.asideTransition}
          uniqueOpened={true}
          defaultActive={this.$route.fullPath}
          ref="menu"
          onSelect={this.handleMenuSelect}
        >
          {this.aside.map(menu => createMenu.call(this, h, menu))}
          <el-menu-item onClick={() => this.addPlaylist()} key={ `addplaylist` }
            index={ 'addplaylist' } >
            <i class={`fa fa-plus`} />
            <span slot="title">添加歌单</span>
          </el-menu-item>
          <el-menu-item onClick={() => this.addPlayer()} key={ `addplayer` }
            index={ 'addplayer' } >
            <i class={`fa fa-plus`} />
            <span slot="title">添加播放器</span>
          </el-menu-item>
        </el-menu>
        {this.aside.length === 0 && !this.asideCollapse ? (
          <div
            class="d2-layout-header-aside-menu-empty"
            flex="dir:top main:center cross:center"
          >
            <d2-icon name="inbox"></d2-icon>
            <span>没有侧栏菜单</span>
          </div>
        ) : null}
      </div>
    );
  },
  data() {
    return {
      asideHeight: 300,
      BS: null
    };
  },
  computed: {
    ...mapState("d2admin/menu", ["aside", "asideCollapse", "asideTransition"]),
    ...mapState("d2admin/user", ["info"])
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse(val) {
      this.scrollDestroy();
      setTimeout(() => {
        this.scrollInit();
      }, 500);
    }
  },
  mounted() {
    this.scrollInit();
  },
  beforeDestroy() {
    this.scrollDestroy();
  },
  methods: {
    addPlaylist() {
      const username = this.info.name;
      this.$prompt("请输入歌单名称", "添加歌单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          const res = await this.$api.SYS_PLAYLIST_ADD({
            name: value,
            username
          });

          this.$router.replace("/playlist/" + res.data.uuid);
        })
        .catch(() => {});
    },
    addPlayer() {
      const username = this.info.name;
      this.$prompt("请输入播放器名称", "添加播放器", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          const res = await this.$api.SYS_PLAYER_ADD({
            name: value,
            username
          });
          this.$router.replace("/player/" + res.data.uuid);
        })
        .catch(() => {});
    },
    scrollInit() {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      });
    },
    scrollDestroy() {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy();
      } catch (e) {
        delete this.BS;
        this.BS = null;
      }
    }
  }
};
