<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6">系统配置</a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 0px" layout="vertical">
          <a-row :gutter="16">
            <a-col v-for="(label, field) in formFields" :key="field" :span="12">
              <a-form-item :field="field" :label="label">
                <a-input
                  v-model="form[field]"
                  style="margin-right: 8px"
                  placeholder="please enter..."
                  allow-clear
                />
                <a-button type="outline" @click="submitForm(field)"
                  >提交</a-button
                >
              </a-form-item>
              <a-typography-text v-if="field === 'bsc_gns_withdraw_fee_ratio'">
                {{ form.bsc_gns_withdraw_fee_ratio }} =
                {{ formatPercentage(form.bsc_gns_withdraw_fee_ratio) }}%
              </a-typography-text>
              <a-typography-text v-if="field === 'bsc_usdt_withdraw_fee_ratio'">
                {{ form.bsc_usdt_withdraw_fee_ratio }} =
                {{ formatPercentage(form.bsc_usdt_withdraw_fee_ratio) }}%
              </a-typography-text>
              <a-divider />
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { getConfiguration, updateConfiguration } from '@/api/disposition';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';

const loading = ref(false);

// 表单字段和标签的映射
const formFields = ref({
  bsc_gns_withdraw_fee_ratio: 'Gns提现手续费',
  bsc_usdt_withdraw_fee_ratio: 'USDT提现手续费',
  bsc_gns_withdraw_minimum_restriction: 'Gns提现最低数量限制',
  bsc_usdt_withdraw_minimum_restriction: 'USDT提现最低数量限制',
  bsc_push_ratio: '直推奖励比例',
  bsc_team_ratio: '团队小区算力奖励',
});

const form = ref<{ [key: string]: string }>({
  bsc_gns_withdraw_fee_ratio: '',
  bsc_usdt_withdraw_fee_ratio: '',
  bsc_gns_withdraw_minimum_restriction: '',
  bsc_usdt_withdraw_minimum_restriction: '',
  bsc_push_ratio: '',
  bsc_team_ratio: '',
});
const getConfigurationForm = async () => {
  try {
    loading.value = true;
    const res = await getConfiguration({});
    // 填充表单数据，只取需要的字段
    form.value.bsc_gns_withdraw_fee_ratio =
      res.json.bsc_gns_withdraw_fee_ratio || '';
    form.value.bsc_usdt_withdraw_fee_ratio =
      res.json.bsc_usdt_withdraw_fee_ratio || '';
    form.value.bsc_gns_withdraw_minimum_restriction =
      (
        Number(res.json.bsc_gns_withdraw_minimum_restriction) /
        10 ** 18
      ).toString() || '';
    form.value.bsc_usdt_withdraw_minimum_restriction =
      (
        Number(res.json.bsc_usdt_withdraw_minimum_restriction) /
        10 ** 18
      ).toString() || '';
    form.value.bsc_push_ratio = res.json.bsc_push_ratio || '';
    form.value.bsc_team_ratio = res.json.bsc_team_ratio || '';
  } catch (error) {
    Message.error('加载配置失败，请重试');
  } finally {
    loading.value = false;
  }
};
// 通用的表单提交方法
const submitForm = async (field: string) => {
  const fieldMapping: { [key: string]: string } = {
    bsc_gns_withdraw_fee_ratio: 'Gns提现手续费比例',
    bsc_usdt_withdraw_fee_ratio: 'USDT提现手续费比例',
    bsc_gns_withdraw_minimum_restriction: 'Gns提现最低数量限制',
    bsc_usdt_withdraw_minimum_restriction: 'USDT提现最低数量限制',
    bsc_push_ratio: '直推奖励比例',
    bsc_team_ratio: '团队小区算力奖励',
  };

  // 验证输入
  if (!form.value[field]) {
    Message.error(`请输入${fieldMapping[field]}`);
    return;
  }

  try {
    loading.value = true;
    // 检查是否需要乘以 10^18
    let valueToSubmit = form.value[field];
    if (
      field === 'bsc_gns_withdraw_minimum_restriction' ||
      field === 'bsc_usdt_withdraw_minimum_restriction'
    ) {
      valueToSubmit = (Number(form.value[field]) * 10 ** 18).toString();
    }

    const res = await updateConfiguration({
      key: field,
      value: valueToSubmit,
    });
    // const res = await updateConfiguration({
    //   key: field,
    //   value: form.value[field],
    // });
    Message.success('提交成功');

    form.value[field] = res.json[field];
    getConfigurationForm();
  } catch (error) {
    Message.error('提交失败，请重试');
  } finally {
    loading.value = false;
  }
};
// 格式化百分比
const formatPercentage = (value: string) => {
  const num = Number(value);
  return num * 100;
};

onMounted(async () => {
  getConfigurationForm();
});
</script>

<style scoped></style>
