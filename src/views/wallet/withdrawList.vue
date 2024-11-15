<template>
  <div style="padding: 20px">
    <a-card>
      <a-typography-title :heading="6"> 提现列表 </a-typography-title>
      <a-divider />
      <a-form :model="form">
        <a-row justify="space-between">
          <a-col :span="12">
            <a-form-item label="提现类型">
              <a-space direction="vertical" size="large">
                <a-select
                  v-model="form.status"
                  :options="withdrawStatus"
                  :style="{ width: '320px' }"
                  placeholder="选择提现状态"
                >
                </a-select>
              </a-space>
            </a-form-item>
            <a-form-item label="审核类型">
              <a-space direction="vertical" size="large">
                <a-select
                  v-model="form.audit_status"
                  :options="auditStatus"
                  :style="{ width: '320px' }"
                  placeholder="选择审核状态"
                >
                </a-select>
              </a-space>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="订单编号">
              <a-input
                v-model="form.serial_number"
                :style="{ width: '320px' }"
                placeholder="输入订单编号"
              />
              <a-button
                type="primary"
                style="margin-right: 10px; margin-left: 10px"
                @click="queryWithdrawListData()"
              >
                <icon-search :size="20" />
                查询
              </a-button>
              <a-button @click="resetQuery">
                <icon-loop :size="20" />
                重置
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-table :data="tableData" style="margin-top: 10px">
        <template #columns>
          <a-table-column
            title="用户昵称"
            data-index="user_name"
            :width="130"
          ></a-table-column>
          <a-table-column
            title="用户手机号"
            data-index="user_phone"
            :width="120"
          ></a-table-column>
          <a-table-column title="提现金额" data-index="amount"></a-table-column>
          <a-table-column
            title="到账金额"
            data-index="real_amount"
          ></a-table-column>
          <a-table-column
            title="交易前余额"
            data-index="before_balance"
          ></a-table-column>
          <a-table-column
            title="交易后余额"
            data-index="after_balance"
          ></a-table-column>
          <a-table-column title="审核状态" data-index="audit_status">
            <template #cell="{ record }">
              <p v-if="record.audit_status === 1">待审核</p>
              <p v-else-if="record.audit_status === 2">审核通过</p>
              <p v-else-if="record.audit_status === 3">审核不通过</p>
            </template>
          </a-table-column>
          <a-table-column title="手续费" data-index="charge"></a-table-column>
          <a-table-column
            title="原因"
            data-index="remark"
            :ellipsis="true"
            :tooltip="{ 'background-color': '#4080ff' }"
          ></a-table-column>
          <a-table-column
            title="订单编号"
            data-index="serial_number"
            :ellipsis="true"
            :tooltip="{ 'background-color': '#4080ff' }"
          ></a-table-column>
          <a-table-column title="交易状态" data-index="status">
            <template #cell="{ record }">
              <p v-if="record.status === 1">进行中</p>
              <p v-else-if="record.status === 2">成功</p>
              <p v-else-if="record.status === 3">失败</p>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="200" align="center">
            <template #cell="{ record }">
              <a-popconfirm
                :content="'确定通过？'"
                type="info"
                @ok="passOk(record.id)"
                @cancel="passCancel"
              >
                <a-button
                  v-if="record.audit_status === 1"
                  type="primary"
                  style="margin-right: 10px"
                  @click="passClick"
                  >通过</a-button
                >
              </a-popconfirm>
              <a-button v-if="record.audit_status === 1" @click="showModal"
                >拒绝
                <a-modal
                  v-model:visible="modalVisible"
                  title="拒绝原因"
                  @ok="
                    reqAuditWithdraw({
                      audit_status: 3,
                      id: record.id,
                      remark: remark,
                    })
                  "
                >
                  <a-input
                    v-model="remark"
                    placeholder="填写拒绝原因"
                    :max-length="50"
                    allow-clear
                    show-word-limit
                  /> </a-modal
              ></a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message } from '@arco-design/web-vue';
  import {
    fetchWithdrawList,
    WithdrawParam,
    Withdraw,
    AuditParam,
    auditWithdraw,
  } from '@/api/wallet';

  const { setLoading } = useLoading(true);
  const tableData = ref<Withdraw[]>([]);
  const remark = ref<string>('');
  const modalVisible = ref<boolean>(false);
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
  });

  const pass = ref(false);

  const withdrawStatus = [
    {
      value: 0,
      label: '全部',
    },
    {
      value: 1,
      label: '待审核',
    },
    {
      value: 2,
      label: '审核通过',
    },
    {
      value: 3,
      label: '审核不通过',
    },
  ];
  const auditStatus = [
    {
      value: 0,
      label: '全部',
    },
    {
      value: 1,
      label: '进行中',
    },
    {
      value: 2,
      label: '成功',
    },
    {
      value: 3,
      label: '失败',
    },
  ];

  const showModal = () => {
    modalVisible.value = !modalVisible.value;
  };

  const form = reactive<WithdrawParam>({
    audit_status: undefined,
    serial_number: undefined,
    status: undefined,
  });

  // 查询提现列表
  const queryWithdrawListData = async (
    params: WithdrawParam = {
      audit_status: form.audit_status,
      status: form.status,
      serial_number: form.serial_number,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchWithdrawList(params);
      tableData.value = res.data.withdraw_list ?? [];
      pagination.current = res.data.current_page ?? 1;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  // 审核提现
  const reqAuditWithdraw = async (
    params: AuditParam = {
      id: pagination.current,
      remark: remark.value,
    }
  ) => {
    const res = await auditWithdraw(params);
    if (res.data === 'success') {
      Message.success('操作成功');
      queryWithdrawListData();
    } else {
      Message.success('操作失败');
    }
  };

  const passClick = () => {
    pass.value = true;
  };
  const passOk = (id: number) => {
    pass.value = false;
    reqAuditWithdraw({ audit_status: 2, id, remark: remark.value });
  };
  const passCancel = () => {
    pass.value = false;
  };

  // 重置查询
  const resetQuery = async () => {
    form.serial_number = '';
    form.audit_status = undefined;
    form.status = undefined;
    await queryWithdrawListData();
  };

  onMounted(() => {
    queryWithdrawListData();
  });
</script>

<style scoped></style>
