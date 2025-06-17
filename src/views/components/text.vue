<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          文本省略，基于 el-text 和
          <el-link
            href="https://vue-tippy.netlify.app/basic-usage"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            VueTippy
          </el-link>
          自动省略后显示 Tooltip 提示， 支持多行省略
        </span>
      </div>
    </template>

    <div class="mb-2">基础用法</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <!-- <YeText> 测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示 </YeText> -->
          <YeText :lineClamp="2">
            测试文本，这是一个稍微有点长的文本，lineClamp参数为2，即两行过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
      </ul>
    </el-space>

    <el-divider />

    <div class="mb-2">自定义 Tooltip 内容</div>
    <div class="mb-2">
      <el-button @click="changeTooltipContent"> 点击切换下方 Tooltip 内容 </el-button>
    </div>
    <el-space wrap>
      <ul class="content">
        <li>
          <YeText :tippyProps="{ content: customContent }">
            props写法 - 测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
        <li>
          <YeText>
            <template #content>
              <div>
                <b>这是插槽写法: </b>
                <div>{{ customContent }}</div>
              </div>
            </template>
            插槽写法 - 测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">自定义 el-text 配置</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <YeText type="primary" size="large">
            测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
        <li>
          <YeText :lineClamp="4" type="info">
            测试文本，这是一个非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长的文本，lineClamp参数为4，即四行过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">自定义 VueTippy 配置</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <YeText :tippyProps="{ offset: [0, -20], theme: 'light', arrow: false }">
            偏移白色无箭头 - 测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
        <li>
          <YeText :lineClamp="4" :tippyProps="{ followCursor: true }">
            鼠标跟随 -
            测试文本，这是一个非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长，非常非常长的文本，lineClamp参数为4，即四行过长省略后，鼠标悬浮会有tooltip提示
          </YeText>
        </li>
      </ul>
    </el-space>

    <el-divider />
    <div class="mb-2">组件嵌套: 不需要省略的需设置 truncated 为 false</div>
    <el-space wrap>
      <ul class="content">
        <li>
          <YeText tag="p" :lineClamp="2">
            This is a paragraph. Paragraph start
            <YeText :truncated="false">
              【 This is YeText
              <YeText tag="sup" size="small" :truncated="false"> superscript 】 </YeText>
            </YeText>
            <el-text>
              【 This is El-Text
              <el-text tag="sub" size="small"> subscript 】 </el-text>
            </el-text>
            <el-text tag="ins">【Inserted】</el-text>
            <el-text tag="del">【Deleted】</el-text>
            <el-text tag="mark">【Marked】</el-text>
            Paragraph end.
          </YeText>
        </li>
      </ul>
    </el-space>
  </el-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import YeText from '@/components/YeText/index.vue'

defineOptions({
  name: 'PureText',
})

const customContent = ref('自定义tooltip内容')

const changeTooltipContent = () => {
  customContent.value = '现在的时间是: ' + dayjs().format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style scoped>
.content {
  width: 400px;
  padding: 15px;
  overflow: hidden;

  /* resize: horizontal; */
  border-radius: 8px;
}

li {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eee;
}
</style>
