<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 用户详情 </a-typography-title>
      <a-divider />
      <a-form :model="form" style="padding-right: 120px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              field="wallet_address"
              label="钱包地址"
              label-col-flex=""
            >
              <a-input
                v-model="form.wallet_address"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="recommend_address"
              label="上级ID"
              label-col-flex=""
            >
              <a-input
                v-model="form.recommend_address"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="invitation_code"
              label="邀请码"
              label-col-flex=""
            >
              <a-input
                v-model="form.invitation_code"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-space>
              <a-button type="primary" @click="queryUserListData"
                >查询</a-button
              >
              <a-button type="primary" @click="resetForm">重置筛选</a-button>
              <a-button type="primary" @click="addOrder()">添加订单</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <a-table :data="userList" style="margin-top: 20px">
            <template #columns>
              <!-- <a-table-column title="用户ID" data-index="id"></a-table-column> -->

              <a-table-column title="钱包地址" data-index="wallet_address">
              </a-table-column>

              <a-table-column
                title="激活状态"
                data-index="activated_state"
              ></a-table-column>

              <a-table-column
                title="邀请码"
                data-index="invitation_code"
              ></a-table-column>

              <a-table-column
                title="上级ID"
                data-index="recommend_address"
              ></a-table-column>

              <a-table-column
                title="推荐人数"
                data-index="push_num"
              ></a-table-column>

              <a-table-column
                title="团队人数"
                data-index="team_num"
              ></a-table-column>

              <a-table-column
                title="可用USDT"
                data-index="usdt_balance"
              ></a-table-column>

              <a-table-column
                title="可用Gns"
                data-index="gns_balance"
              ></a-table-column>

              <a-table-column
                title="剩余产值"
                data-index="production_value"
              ></a-table-column>

              <a-table-column
                title="注册时间"
                data-index="created_at"
              ></a-table-column>

              <a-table-column title="操作">
                <template #cell="{ record }">
                  <a-space wrap>
                    <!-- <a-button type="primary">修改</a-button> -->
                    <a-button
                      type="primary"
                      @click="
                        prohibitClick(
                          2,
                          record.wallet_address,
                          record.activated_state
                        )
                      "
                      >禁止收益</a-button
                    >
                    <a-button
                      type="primary"
                      @click="
                        prohibitClick(
                          1,
                          record.wallet_address,
                          record.activated_state
                        )
                      "
                      >禁止提现</a-button
                    >
                    <!-- <a-button type="primary" @click="addOrder()"
                      >添加订单</a-button
                    > -->
                  </a-space>
                </template>
              </a-table-column>
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
      <a-modal
        :visible="visible"
        :mask-closable="false"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form ref="formRef" :model="addOrderForm">
          <a-form-item field="dispose" label="地址">
            <!-- Address -->
            <a-input
              v-model="Address"
              placeholder="填写地址"
              allow-clear
              show-word-limit
            />
          </a-form-item>
          <a-form-item field="dispose" label="节点类型">
            <a-select v-model="addOrderForm">
              <a-option value="1">100U</a-option>
              <a-option value="2">300U</a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal
        :visible="visiblep"
        :mask-closable="false"
        @ok="prohibit"
        @cancel="visiblep = false"
      >
        是否确认要修改{{ type === 1 ? '提现' : '收益' }}
      </a-modal>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { createNode, getUserInfoApi, updateUserState } from '@/api/user';

  import { Message } from '@arco-design/web-vue';

  // const totalUserInfos = ref(0);
  const userList = ref([]);
  const visible = ref(false);
  const addOrderForm = ref();
  const form = ref({
    wallet_address: '', // 钱包地址
    recommend_address: '', // 上级地址
    invitation_code: '', // 邀请码
    page: 1, // 页码
    page_size: 10, // 每页条数
  });

  // const handlePageChange = (current: number) => {
  //   if (current - 1 !== form.value.page) {
  //     form.value.page = current - 1;
  //     // queryUserListData()
  //   }
  // };

  // 查询用户列表
  const queryUserListData = async () => {
    try {
      const res = await getUserInfoApi(form.value);
      if (res.code === 0) {
        userList.value = res.json.list;
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  const resetForm = () => {
    form.value = {
      wallet_address: '', // 钱包地址
      recommend_address: '', // 上级地址
      invitation_code: '', // 邀请码
      page: 1, // 页码
      page_size: 10, // 每页条数
    };
    queryUserListData();
  };
  const Address = ref(''); // 钱包地址
  const addOrder = () => {
    visible.value = true;
  };

  const handleOk = async () => {
    if (!Address.value) {
      Message.error('请填写地址');
      return;
    }
    if (!addOrderForm.value) {
      Message.error('请选择节点类型');
      return;
    }
    const res = await createNode({
      wallet_address: Address.value,
      type: Number(addOrderForm.value),
    });
    if (res.code === 0) {
      visible.value = false;
      Message.success('创建成功');
    }
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const visiblep = ref(false);
  const walletAddress = ref();
  const type = ref();
  const activatedState = ref('未激活');
  const prohibitClick = (typeNum: number, wallet: string, State: string) => {
    visiblep.value = true;
    walletAddress.value = wallet;
    type.value = typeNum;
    activatedState.value = State;
  };
  const prohibit = () => {
    const state = ref(true);
    if (activatedState.value === '已激活') {
      state.value = true;
    } else {
      state.value = false;
    }

    const res = updateUserState({
      wallet_address: walletAddress.value,
      state: state.value,
      type: type.value,
    });
    if (res.code === 0) {
      visiblep.value = false;
      Message.success('修改成功');
    } else {
      Message.error('修改失败');
    }
  };
  onMounted(async () => {
    queryUserListData();
  });
</script>

<style scoped></style>
