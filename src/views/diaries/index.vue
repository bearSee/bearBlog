<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:31:16
 * @LastEditTime: 2019-11-12 18:33:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="diaries">
    <el-table
      class="diaries-table"
      v-show="!detailVisible"
      :data="diarieData"
      @row-click="handlerRowClick">
      <el-table-column
        v-for="col in diarieTableCol[i18nName]"
        :key="col.code"
        :prop="col.code"
        :label="$t(col.label)"
        :width="col.label" />
    </el-table>
    <el-dialog
      class="diaries-detali"
      fullscreen
      :modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      :visible.sync="detailVisible">
      <el-page-header
        :title="i18nName === 'zh-CN' ? '返回' : 'Back'"
        @back="detailVisible = false"
        :content="detailTitle" />
      <div
        class="detali-content vertical-scroll"
        v-html="detailContent" />
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'Diaries',
    data() {
        return {
            diarieTableCol: {
                'zh-CN': [
                    {
                        label: '标题',
                        code: 'title_Cn',
                    },
                    {
                        label: '发表日期',
                        code: 'pubTime',
                    },
                    {
                        label: '阶段',
                        code: 'phase_Cn',
                    },
                    {
                        label: '作者',
                        code: 'author_Cn',
                    },
                ],
                'en-US': [
                    {
                        label: '标题',
                        code: 'title_En',
                    },
                    {
                        label: '发表日期',
                        code: 'pubTime',
                    },
                    {
                        label: '阶段',
                        code: 'phase_En',
                    },
                    {
                        label: '作者',
                        code: 'author_En',
                    },
                ],
            },
            diarieData: [],
            detailVisible: false,
            detailData: {},
        };
    },
    methods: {
        getDiaries() {
            this.$http.get('diaries/diarieLists.json').then(({ data }) => {
                this.diarieData = data && data.list || [];
            });
        },
        handlerRowClick({ fileName }) {
            this.$http.get(`diaries/${fileName}`).then(({ data }) => {
                this.detailVisible = true;
                this.detailData = data || {};
            });
        },
    },
    computed: {
        i18nName() {
            return this.$i18n.locale;
        },
        detailTitle() {
            const data = this.detailData[this.i18nName] || {};
            return data.title || '';
        },
        detailContent() {
            const data = this.detailData[this.i18nName] || {};
            return data.content || '';
        },
    },
    created() {
        this.getDiaries();
    },
};
</script>

<style lang="scss">

.diaries {
  padding: 20px;
  height: 100%;
  background: rgba(0, 0, 0, 0.3)!important;
  .diaries-table {
    height: 100%;
    background: transparent;
    &::before {
      background-color: var(--theme);
    }
    td, th.is-leaf {
      border-bottom: 1px solid var(--theme);
    }
    th {
      background-color: var(--theme);
      opacity: .9;
      color: var(--bgColor);
    }
    .el-table__body-wrapper {
      height: calc(100% - 40px);
      overflow-y: auto;
      .el-table__row {
        background: transparent;
        color: var(--theme);
        cursor: pointer;
        &:hover {
          td {
            color: var(--bgColor);
            background: var(--theme);
          }
        }
      }
    }
    /*竖向滚动条样式*/
    .el-table__body-wrapper::-webkit-scrollbar {
      width: 4px;
      background: #f8f8f8;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 4px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: var(--theme);
    }
    .el-table__body-wrapper::-webkit-scrollbar-track {/*滚动条里面轨道*/
      border-radius: 4px;
    }
  }
  .diaries-detali {
    .el-dialog__header {
      display: none;
    }
    .el-dialog, .el-dialog__header {
      background: rgba(250, 250, 250, 0.1);
      .el-dialog__body {
        height: 100%;
        padding: 20px 0;
        color: var(--theme);
        color: #d7eeda;
        display: flex;
        flex-direction: column;
        .detali-content {
          flex: 1 1 auto;
          overflow-y: auto;
          margin-top: 20px;
          padding: 0 20px;
          line-height: 20px;
          font-size: 16px;
          text-indent: 2rem;
          p {
            word-break: break-all;
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
