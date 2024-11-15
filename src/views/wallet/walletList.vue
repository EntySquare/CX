<template>
  <div style="padding: 20px">
    <a-card>
      <a-typography-title :heading="6">
        钱包列表
      </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row :gutter="16">
          <a-col :span="4">
            <a-input v-model="form.value2" placeholder="手机号,昵称" />
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
      <a-divider />
      <a-table :data="data">
        <template #columns>
          <a-table-column title="头像">
            <template #cell="{ record }">
              <a-avatar>
                <img
                  alt="avatar"
                  :src="record.title"
                />
              </a-avatar>
            </template>
          </a-table-column>
          <a-table-column title="用户" data-index="name"></a-table-column>
          <a-table-column title="余额" data-index="surplus"></a-table-column>
          <a-table-column
            title="可用余额"
            data-index="available"
          ></a-table-column>
          <a-table-column title="冻结金额" data-index="freeze"></a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button @click="$modal.info({ title:'Name', content:record.name })" type="primary">详情</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";

  const form = reactive({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  })
      const columns = [
        {
          title: '头像',
          slotName: 'address',
          dataIndex: 'address',
        },
        {
          title: '用户',
          dataIndex: 'name',
        },
        {
          title: '余额',
          dataIndex: 'surplus',
        },
        {
          title: '可用余额',
          dataIndex: 'available',
        },
        {
          title: '冻结余额',
          dataIndex: 'freeze',
        },
        {
          title: '操作',
          slotName: 'operate',
        },
      ];
      const data = [
        {
          address:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa436dbd3-95ed-4692-9a3c-0bd22947379a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680432271&t=cfa2cfe6546d7e87ec2ca883d9213a8b',
          name: 'Jane Doe',
          first: 'Jane',
          last: 'Doe',
          surplus: 23000,
          available: '32 Park Road, London',
          freeze: 'jane.doe@example.com',
        },
        {
          address:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F03a20523-de90-4d7a-ab7d-80a3cb5e0d13%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680432271&t=0bd27f537c11b5b103170f1b4e345f52',
          name: 'Alisa Ross',
          first: 'Alisa',
          last: 'Ross',
          surplus: 25000,
          available: '35 Park Road, London',
          freeze: 'alisa.ross@example.com',
        },
        {
          address:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F8345f79f-09eb-478c-b936-6b56e730561f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680432271&t=1683d2a7f4af3ea163d777088d1fa880',
          name: 'Kevin Sandra',
          first: 'Kevin',
          last: 'Sandra',
          surplus: 22000,
          available: '31 Park Road, London',
          freeze: 'kevin.sandra@example.com',
        },
        {
          address:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F84edd43b-749b-4180-8b65-37874602898d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680432271&t=dd785055e53c7c833a7f017beefe4324',
          name: 'Ed Hellen',
          first: 'Ed',
          last: 'Hellen',
          surplus: 17000,
          available: '42 Park Road, London',
          freeze: 'ed.hellen@example.com',
        },
        {
          address:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F80e4863d-9b97-4a88-8fd0-c4edfe222676%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680432271&t=c13aeff5f89901cbb443a24cfe4fac20',
          name: 'William Smith',
          first: 'William',
          last: 'Smith',
          surplus: 27000,
          available: '62 Park Road, London',
          freeze: 'william.smith@example.com',
        },
      ];

</script>

<style scoped>

</style>
