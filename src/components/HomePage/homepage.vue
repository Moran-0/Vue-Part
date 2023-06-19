<template>
  <div>

    <el-row :gutter="30" style="margin-bottom:20px">
      <el-col :span="6">
        <el-card style="color:#409EFF">
          <div><i class="el-icon-user-solid"/>用户总量</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">1296</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color:#F56C6C">
          <div><i class="el-icon-money"/>订单总量</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">2567</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card  style="color:#67C23A">
          <div><i class="el-icon-bank-card"/>收益总额</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">￥30003</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card  style="color:#409EFF">
          <div style="color:#409EFF"><i class="el-icon-s-shop"/>门店总数</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">20</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="30" style="margin-bottom:60px">
      <el-col :span="6">
        <el-card style="color:#4389A2">
          <div><i class="el-icon-user-solid"/>员工总量</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">32</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: aqua">
          <div><i class="el-icon-money"/>收益最高城市</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">上海</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card  style="color: deeppink">
          <div><i class="el-icon-bank-card"/>使用率最高</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">中型寄存柜</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card  style="color: mediumpurple">
          <div style="color:mediumpurple"><i class="el-icon-s-shop"/>建立时间</div>
          <div style="padding:10px 0;text-align:center;font-weight:bold">67天</div>
        </el-card>
      </el-col>
    </el-row>
<!--    <div class="index">-->
<!--      &lt;!&ndash; 跑马灯  &ndash;&gt;-->
<!--&lt;!&ndash;      <div>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-carousel :interval="5000" type="card" height="320px">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-carousel-item v-for="item in imgList" :key="item.id">&ndash;&gt;-->
<!--&lt;!&ndash;            <img :src="item.idView" class="image">&ndash;&gt;-->
<!--&lt;!&ndash;          </el-carousel-item>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-carousel>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->


    <div class="container">
         <div class="left">
           <div style="margin-top:55px;">
           <div class="calendar">
             <div class="header">
               <button class="prev" @click="prevMonth">&lt;</button>
               <div class="title">{{ title }}</div>
               <button class="next" @click="nextMonth">&gt;</button>
             </div>
             <div class="weekdays">
               <div v-for="day in daysOfWeek" :key="day" class="day">{{ day }}</div>
             </div>
             <div class="days">
               <div
                   v-for="day in days"
                   :key="day.date"
                   :class="{
          today: isToday(day),
          selected: isSelected(day),
          notCurrentMonth: isNotCurrentMonth(day),
        }"
                   @click="select(day)"
               >
                 {{ day.day }}
               </div>

             </div>
           </div>
           </div>

         </div>



      <div class="right">
        <fx67ll-binary-clock :isShowTime="true" :zoomSize="1"></fx67ll-binary-clock>
      </div>




  </div>

  </div>
</template>


<script >
import { ref, computed } from "vue";

import * as echarts from 'echarts';
import { reactive } from 'vue'

export default {
  props: {
    selectedDate: Date,
  },
  emits: ["update:selectedDate"],
  setup(props, { emit }) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = ref(new Date());
    const selectedDate = ref(props.selectedDate || currentDate.value);

    const daysOfWeek = computed(() => {
      return weekdays;
    });

    const days = computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInLastMonth = new Date(year, month, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();

      const days = [];
      let day = 1;
      let lastMonthDay = daysInLastMonth - firstDayOfMonth + 1;
      let nextMonthDay = 1;

      for (let i = 0; i < 6 * 7; i++) {
        if (i < firstDayOfMonth) {
          days.push({
            date: new Date(year, month - 1, lastMonthDay),
            day: lastMonthDay,
            isLastMonth: true,
            isNextMonth: false,
          });
          lastMonthDay++;
        } else if (i >= firstDayOfMonth + daysInMonth) {
          days.push({
            date: new Date(year, month + 1, nextMonthDay),
            day: nextMonthDay,
            isLastMonth: false,
            isNextMonth: true,
          });
          nextMonthDay++;
        } else {
          const date = new Date(year, month, day);
          days.push({ date, day, isLastMonth: false, isNextMonth: false });
          day++;
        }
      }

      return days;
    });

    const title = computed(
        () =>
            `${currentDate.value.toLocaleString("default", {
              month: "long",
            })} ${currentDate.value.getFullYear()}`
    );

    const prevMonth = () => {
      currentDate.value = new Date(
          currentDate.value.getFullYear(),
          currentDate.value.getMonth() - 1,
          1
      );
    };

    const nextMonth = () => {
      currentDate.value = new Date(
          currentDate.value.getFullYear(),
          currentDate.value.getMonth() + 1,
          1
      );
    };

    const isToday = (day) => {
      const today = new Date();
      return day.date.toDateString() === today.toDateString();
    };

    const isSelected = (day) => {
      return day.date.toDateString() === selectedDate.value.toDateString();
    };

    const isNotCurrentMonth = (day) => {
      return day.isLastMonth || day.isNextMonth;
    };

    const select = (day) => {
      selectedDate.value = day.date;
      emit("update:selectedDate", day.date);
    };

    return {
      daysOfWeek,
      days,
      title,
      prevMonth,
      nextMonth,
      isToday,
      isSelected,
      isNotCurrentMonth,
      select,
    };
  },
};

</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-between;
}

.left {
  width: 47%;
  text-align: center;
  margin-left: 31px;
}

.right {
  width: 58%;
}


.index{
  background:#ffffff;
  width: 95%;
  text-align: center;
  margin-left: 31px;


}
.el-carousel__item h3 {
  color: #ffffff;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.calendar {
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.weekdays {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.day {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
}

.today {
  background-color: lightblue;
}

.selected {
  background-color: blue;
  color: white;
}

.notCurrentMonth {
  color: #ccc;
}

</style>
