<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6">产品配置</a-typography-title>
        <a-divider />

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              :data="productsList"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="id" data-index="id"></a-table-column>

                <a-table-column title="购买金额" data-index="amount">
                </a-table-column>

                <!-- <a-table-column
                  title="购买币种"
                  data-index="status"
                ></a-table-column> -->

                <a-table-column title="类型" data-index="type"></a-table-column>
                <a-table-column
                  title="增加产值"
                  data-index="production_value"
                ></a-table-column>

                <a-table-column
                  title="增加算力"
                  data-index="node_power"
                ></a-table-column>

                <!-- <a-table-column title="状态" data-index="burn_num">
                  <template #columns="">
                    <a-switch />
                  </template>
                </a-table-column> -->

                <!-- <a-table-column
                  title="创建时间"
                  data-index="price"
                ></a-table-column>

                <a-table-column
                  title="修改时间"
                  data-index="burn_time"
                ></a-table-column> -->
                <!-- <a-table-column
                  title="编辑"
                  data-index="burn_time"
                ></a-table-column> -->
              </template>
            </a-table>
            <!-- <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfo"
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
  import { getNodeConfigurations } from '@/api/disposition';
  import { onMounted, ref } from 'vue';

  const loading = ref(false);
  const productsList = ref([]);

  const getProductsList = async () => {
    try {
      loading.value = true;
      const res = await getNodeConfigurations();
      productsList.value = res.json;
    } finally {
      loading.value = false;
    }
  };
  // const totalUserInfo = ref(0);
  // const handlePageChange = (current: number) => {
  //   if (current - 1 !== form.value.page) {
  //     form.value.page = current - 1;
  //     getProductsList();
  //   }
  // };
  onMounted(() => {
    getProductsList();
  });
</script>

<style scoped></style>
