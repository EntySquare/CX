<template>
  <div style="padding: 20px">
    <a-card>
      <a-typography-title :heading="6">
        充值记录列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="value1" label="充值类型" label-col-flex="100px">
              <a-space direction="vertical" size="large">
                <a-select v-model="value"  :style="{width:'320px'}" placeholder="微信,银行卡">
                  <a-option v-for="item of choice" :value="item" :label="item.label" :key="item"></a-option>
                </a-select>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-input v-model="form.value2" placeholder="手机号" />
          </a-col>
          <a-col :span="8" >
            <a-button type="primary" style="margin-right: 10px">
              <icon-search :size="20"  />
              查询
            </a-button>
            <a-button>
              <icon-loop :size="20" />
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <a-table :data="data" style="margin-top: 10px">
        <template #columns>
          <a-table-column title="充值用户" data-index="name"></a-table-column>
          <a-table-column title="充值金额" data-index="surplus"></a-table-column>
          <a-table-column title="充值类型" data-index="name"></a-table-column>
          <a-table-column title="数据源" data-index="surplus"></a-table-column>
          <a-table-column title="状态" data-index="name"></a-table-column>
          <a-table-column title="充值时间" data-index="surplus"></a-table-column>
        </template>
      </a-table>
    </a-card>


    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

    const show = ref(true);
    const value = ref();
    const scrollbar = ref(true);
    const scroll = {
      x: 1200,
      y: 500
    };
    const choice = [{
      value: '微信',
      label: '微信',
      other: 'extra'
    }, {
      value: '银行卡',
      label: '银行卡',
      other: 'extra'
    }]

    const columns = [{
      title: "充值用户",
      dataIndex: "name"
    }, {
      title: "充值金额",
      dataIndex: "money"
    }, {
      title: "充值类型",
      dataIndex: "type"
    }, {
      title: "原数据",
      dataIndex: "original"
    }, {
      title: "状态",
      dataIndex: "status"
    }, {
      title: "充值时间",
      dataIndex: "status"
    }];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      money: 23000,
      type: '32 Park Road, London',
      original: 'jane.doe@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '2',
      name: 'Alisa Ross',
      money: 25000,
      type: '35 Park Road, London',
      original: 'alisa.ross@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '3',
      name: 'Kevin Sandra',
      money: 22000,
      type: '31 Park Road, London',
      original: 'kevin.sandra@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '4',
      name: 'Ed Hellen',
      money: 17000,
      type: '42 Park Road, London',
      original: 'ed.hellen@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }, {
      key: '5',
      name: 'William Smith',
      money: 27000,
      type: '62 Park Road, London',
      original: 'william.smith@example.com',
      source: '32 Park Road, London',
      status: '32 Park Road, London',
    }]);
const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
})
</script>

<style scoped>


</style>
