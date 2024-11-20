<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 直推排行 </a-typography-title>
        <a-divider />
        <a-space>
          <a-date-picker
            v-model="selectedMonth"
            style="width: 200px"
            placeholder="选择月份"
            mode="month"
            disabled-input="true"
            @change="onSelectMonth"
          />

          <!-- 输入框，用户选择第几周 -->
          <!-- 绑定用户选择的第几周  -->
          <!-- 周数的最小值为 1 -->
          <!--  周数的最大值为 5，每个月最多有 5 周 -->
          <a-input-number
            v-model="weekNumber"
            :min="1"
            :max="maxWeeks"
            :disabled="!selectedMonth"
            placeholder="选择周数"
            allow-clear
            @change="onSelectWeek"
          />
          <!-- <a-select
            v-model="weekNumber"
            :style="{ width: '320px' }"
            :disabled="!selectedMonth"
            placeholder="选择周数"
            @change="onSelectWeek"
          >
            <a-option v-for="(week, index) in availableWeeks" :key="index">
              第{{ index + 1 }}周 ({{ format(week.start, 'MM月dd日') }} -
              {{ format(week.end, 'MM月dd日') }})</a-option
            >
          </a-select> -->
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
              :pagination="false"
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
            <!-- <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfos"
                :current="form.page + 1"
                :page-size="20"
                show-total
                @change="
                  (current) => {
                    handlePageChange(current);
                  }
                "
              ></a-pagination>
            </div> -->
          </a-grid-item>
        </a-grid>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { Message, TableRowSelection } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import {
    startOfMonth,
    addWeeks,
    format,
    endOfMonth,
    differenceInWeeks,
    addDays,
  } from 'date-fns'; // 导入 date-fns 库的日期处理方法
  import { createRanking, getRankingList } from '@/api/ranking';

  const availableWeeks = ref(); // 可用周数
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

  const selectedMonth = ref<Date | undefined>(undefined); // 用户选择的月份
  const weekNumber = ref<number | undefined>(undefined); // 用户选择的第几周
  const maxWeeks = ref<number>(5); // 默认最大周数为 5

  // 计算某个月的总周数
  const getTotalWeeksInMonth = (month: Date): number => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return differenceInWeeks(addWeeks(end, 1), start); // 获取该月的总周数
  };
  // 计算某个月份的周数
  const calculateWeeksInMonth = (month: Date) => {
    const firstDay = startOfMonth(month); // 月份第一天
    const lastDay = endOfMonth(month); // 月份最后一天

    const weeks = [];
    let currentWeekStart = firstDay;

    while (currentWeekStart <= lastDay) {
      // 一周结束日期为开始日期 + 6 天
      const currentWeekEnd = addDays(currentWeekStart, 6);
      weeks.push({
        start: currentWeekStart,
        end: currentWeekEnd > lastDay ? lastDay : currentWeekEnd, // 防止超过月末
      });

      // 下一周开始
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeks; // 返回所有周的日期范围
  };
  // 当用户选择月份时触发
  const onSelectMonth = (date: Date) => {
    selectedMonth.value = date; // 设置选中的月份
    availableWeeks.value = calculateWeeksInMonth(date); // 计算月份的周数范围

    weekNumber.value = undefined; // 重置周数选择
    maxWeeks.value = getTotalWeeksInMonth(date); // 动态计算该月总周数
  };

  // 当用户选择周数时触发
  const onSelectWeek = (weekNum: number | undefined) => {
    weekNumber.value = weekNum ?? undefined; // 设置选中的周数
  };

  // 获取周数范围
  const getWeekRange = (month: Date, weekNum: number) => {
    const startOfMonthDate = startOfMonth(month);
    const startOfWeek = addWeeks(startOfMonthDate, weekNum - 1);
    const endOfWeek = addWeeks(startOfWeek, 1);

    const startTimestamp = Math.floor(startOfWeek.getTime() / 1000);
    const endTimestamp = Math.floor(endOfWeek.getTime() / 1000);

    const formattedStartOfWeek = format(startOfWeek, 'yyyy年MM月dd日');
    const formattedEndOfWeek = format(endOfWeek, 'yyyy年MM月dd日');
    console.log(
      'formattedRange',
      `${formattedStartOfWeek} 到 ${formattedEndOfWeek}`
    );

    return {
      formattedRange: `${formattedStartOfWeek} 到 ${formattedEndOfWeek}`,
      startTimestamp,
      endTimestamp,
    };
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
      // 获取排名列表
      const res = await getRankingList({
        start_time: startTimestamp,
        end_time: endTimestamp,
        ranking_type: 1,
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
      loading.value = true;
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
        ranking_type: 1,
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
  // const totalUserInfos = ref(0);
  // const handlePageChange = (current: number) => {
  //   if (current - 1 !== form.value.page) {
  //     form.value.page = current - 1;
  //     getWithdrawalList();
  //   }
  // };

  const onSelectionChange = (selectedRowKeys: TableRowSelection) => {
    selectedList.value = selectedRowKeys;
  };
</script>

<style scoped></style>
