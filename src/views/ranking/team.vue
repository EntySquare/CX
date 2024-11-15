<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 团队业绩排行 </a-typography-title>
        <a-divider />
        <a-space>
          <a-date-picker
            v-model="selectedMonth"
            placeholder="选择月份"
            mode="month"
            @change="onSelectMonth"
          />

          <!-- 输入框，用户选择第几周 -->
          <!-- 绑定用户选择的第几周  -->
          <!-- 周数的最小值为 1 -->
          <!--  周数的最大值为 5，每个月最多有 5 周 -->
          <a-input-number
            v-model="weekNumber"
            :min="1"
            :max="5"
            placeholder="选择周数"
            @change="onSelectWeek"
          />
          <a-button type="primary" @click="getWithdrawalList">查询</a-button>
          <a-space></a-space>
          <a-space></a-space>
          <a-button type="primary" @click="modifiedState()"
            >修改勾选状态</a-button
          >
        </a-space>
        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              v-model:expandedKeys="expandedKeys"
              :data="withdrawList"
              style="margin-top: 20px"
              :row-selection="rowSelection"
              row-key="wallet_address"
              @select="modifiedState1"
              @selection-change="onSelectionChange"
            >
              <template #columns>
                <a-table-column title="钱包地址" data-index="wallet_address">
                </a-table-column>

                <a-table-column
                  title="业绩"
                  data-index="performance"
                ></a-table-column>

                <a-table-column title="人数" data-index="num"></a-table-column>

                <a-table-column
                  title="排名"
                  data-index="ranking"
                ></a-table-column>

                <a-table-column
                  title="结算时间"
                  data-index="settlement_time"
                ></a-table-column>

                <a-table-column
                  title="奖励数量"
                  data-index="award_num"
                ></a-table-column>

                <a-table-column
                  title="状态"
                  data-index="status"
                ></a-table-column>
              </template>
            </a-table>
          </a-grid-item>
        </a-grid>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { Message, TableRowSelection } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import { startOfMonth, addWeeks, format } from 'date-fns'; // 导入 date-fns 库的日期处理方法
  import { createRanking, getRankingList } from '@/api/ranking';

  const withdrawList = ref();
  const loading = ref(false);
  const selectedList = ref();
  const rowSelection = ref({
    type: 'checkbox', // 确保类型为 'checkbox'
    showCheckedAll: true, // 显示全选按钮
    checkStrictly: true, // 选中父节点时，子节点也会被选中
  });

  const expandedKeys = ref([]);

  //! 时间处理相关
  // 声明响应式变量，用于存储用户选择的月份和第几周
  const selectedMonth = ref<Date>(); // 用户选择的月份，初始值为 null
  const weekNumber = ref<number>(); // 用户选择的第几周，初始值为 null

  // 获取某个月份的第 N 周的日期范围（开始日期和结束日期）并返回秒级时间戳
  const getWeekRange = (month: Date, weekNum: number) => {
    const startOfMonthDate = startOfMonth(month); // 获取当前月份的开始日期
    const startOfWeek = addWeeks(startOfMonthDate, weekNum - 1); // 计算第 N 周的开始日期，通过在月份开始日期基础上加上 N-1 周
    const endOfWeek = addWeeks(startOfWeek, 1); // 计算第 N 周的结束日期，结束日期是开始日期加一周

    // 获取开始和结束日期的时间戳，并转换为秒级时间戳
    const startTimestamp = Math.floor(startOfWeek.getTime() / 1000);
    const endTimestamp = Math.floor(endOfWeek.getTime() / 1000);

    // 格式化日期，输出 "YYYY年MM月DD日"
    const formattedStartOfWeek = format(startOfWeek, 'yyyy年MM月dd日');
    const formattedEndOfWeek = format(endOfWeek, 'yyyy年MM月dd日');

    // 返回格式化后的日期范围和秒级时间戳
    return {
      formattedRange: `${formattedStartOfWeek} 到 ${formattedEndOfWeek}`,
      startTimestamp,
      endTimestamp,
    };
  };

  // 计算某个月份总共有多少周（ISO 8601 标准计算）
  // const getMonthWeeks = (month: Date) => {
  //   const start = startOfMonth(month); // 获取该月份的开始日期
  //   const end = endOfMonth(month); // 获取该月份的结束日期
  //   const totalWeeks = getISOWeek(end) - getISOWeek(start) + 1; // 计算该月的总周数，通过获取月份结束日期和开始日期的 ISO 周数差值

  //   return totalWeeks; // 返回该月份的总周数
  // };

  // 当用户选择月份时触发的回调函数
  const onSelectMonth = (date: Date) => {
    selectedMonth.value = date; // 更新用户选择的月份
  };

  // 当用户选择周数时触发的回调函数
  const onSelectWeek = (weekNum: number | undefined) => {
    weekNumber.value = weekNum; // 更新用户选择的第几周
  };

  // ! 时间处理相关

  // 获取列表
  const getWithdrawalList = async () => {
    // 判断用户是否选择了月份和周数
    if (!selectedMonth.value || !weekNumber.value) {
      Message.error('请选择月份和周数');
      return;
    }
    loading.value = true;

    // 获取选择的秒级时间戳
    const { startTimestamp, endTimestamp } = getWeekRange(
      selectedMonth.value,
      weekNumber.value
    );

    try {
      const res = await getRankingList({
        start_time: startTimestamp,
        end_time: endTimestamp,
        ranking_type: 2,
      });

      if (res.code === 0) {
        if (res.json.length === 0) {
          Message.info('暂无数据');
        } else {
          Message.success('获取列表成功');
        }
        withdrawList.value = res.json;
        // 展开所有行
        // 展开所有行，给符合条件的行加上 disabled 属性
        withdrawList.value = withdrawList.value.map((item: any) => {
          if (item.status !== '未操作') {
            // 给符合条件的项加上 disabled 属性
            item.disabled = true;
          } else {
            // 其他项不修改 disabled 属性
            item.disabled = false;
          }
          return item;
        });
      }
    } catch (err) {
      // console.error('获取列表失败', err);
    } finally {
      loading.value = false;
    }
  };

  // 批量修改状态并发起请求
  const modifiedState = async () => {
    if (selectedList.value.length === 0) {
      Message.error('请选择需要修改的项');
      return;
    }

    // 匹配选中的钱包地址
    const selectedItems = withdrawList.value.filter(
      (item: any) => selectedList.value.includes(item.wallet_address) // 通过 wallet_address 进行匹配
    );

    if (!selectedMonth.value || !weekNumber.value) {
      Message.error('请选择月份和周数');
      return;
    }
    // 获取选择的秒级时间戳
    const { startTimestamp, endTimestamp } = getWeekRange(
      selectedMonth.value,
      weekNumber.value
    );
    try {
      // 构建请求数据
      const withdrawalHandleReq = {
        list: selectedItems.map((item: any) => {
          return {
            wallet_address: item.wallet_address,
            performance: item.performance,
            num: item.num,
            ranking: item.ranking,
            settlement_time: item.settlement_time,
            award_num: item.award_num,
            status: item.status,
          };
        }),
        start_time: startTimestamp,
        end_time: endTimestamp,
        ranking_type: 2,
      };

      // 发起请求处理选中的项
      const res = await createRanking(withdrawalHandleReq);
      if (res.code === 0) {
        Message.success(
          `操作完成：${res.json.success_count} 条成功，${res.json.fail_count} 条失败`
        );
        getWithdrawalList();
        //   清空已选列表
        selectedList.value = [];
      }
    } catch (err) {
      Message.error('操作失败');
    } finally {
      loading.value = false;
    }
  };
  const onSelectionChange = (selectedRowKeys: TableRowSelection) => {
    selectedList.value = selectedRowKeys;
  };
</script>

<style scoped></style>
