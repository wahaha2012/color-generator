<template>
  <div class="colors-generator">
    <el-row>
      <el-form
        :model="colorSetting"
        :rules="rules"
        :inline="true"
        ref="colorForm"
        class="color-settings"
      >
        <el-form-item label="Count" prop="count">
          <el-input v-model="colorSetting.count" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="Random">
          <el-switch v-model="colorSetting.random"></el-switch>
        </el-form-item>
        <el-form-item label="Custom">
          <el-switch v-model="colorSetting.customColor"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('colorForm')"
            >Generate</el-button
          >
          <el-button @click="resetForm('colorForm')">Clear</el-button>
          <el-button @click="getColorList()">Get Colors</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-form v-show="colorSetting.customColor" inline>
      <el-form-item label="Background Lightness">
        <el-input-number
          v-model="colorSetting.bgV"
          :precision="2"
          :step="0.1"
          :min="0.1"
          :max="1"
          class="input-number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Background Saturation">
        <el-input-number
          v-model="colorSetting.bgS"
          :precision="2"
          :step="0.1"
          :min="0.1"
          :max="1"
          class="input-number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Foreground Lightness">
        <el-input-number
          v-model="colorSetting.fgV"
          :precision="2"
          :step="0.1"
          :min="0.1"
          :max="1"
          class="input-number"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="Foreground Saturation">
        <el-input-number
          v-model="colorSetting.fgS"
          :precision="2"
          :step="0.1"
          :min="0.1"
          :max="1"
          class="input-number"
        ></el-input-number>
      </el-form-item>
    </el-form>

    <section class="color-list-value" v-if="showColorValue">
      <el-input type="textarea" v-model="colorListValue" rows="16" />
    </section>

    <section class="color-list-container" ref="list">
      <ul class="color-list">
        <li v-for="(color, i) in colorList" :key="i">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              Background: {{ color.bgColor.hex.toUpperCase() }}<br />
              Foreground: {{ color.textColor.hex.toUpperCase() }}
            </div>
            <div
              class="cell"
              :style="
                `background: ${color.bgColor.hex}; color: ${color.textColor.hex};`
              "
            >
              {{ color.textColor.hex }}
            </div>
          </el-tooltip>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { generateFromHSV, colorFormatter } from "./utils";
export default {
  name: "ColorGenerator",
  data() {
    return {
      colorSetting: {
        count: 100,
        random: false,
        customColor: false,
        bgV: 1,
        bgS: 0.1,
        fgS: 0.6,
        fgV: 0.6
      },
      colorList: [],
      colorListValue: "",
      showColorValue: false,
      rules: {
        count: [{ required: true, message: "请输入数量", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.createColor();
  },
  methods: {
    submitForm() {
      this.createColor();
    },
    resetForm() {
      this.colorList = [];
    },
    createColor() {
      for (let i = 0; i < this.colorSetting.count; i++) {
        this.colorList.push(
          generateFromHSV(
            this.colorSetting.random
              ? null
              : (i / this.colorSetting.count) * 0.9,
            {
              ...this.colorSetting
            }
          )
        );
      }
    },

    getColorList() {
      const bgColorList = this.colorList.map(item =>
        colorFormatter(item.bgColor)
      );
      const textColorList = this.colorList.map(item =>
        colorFormatter(item.textColor)
      );

      this.colorListValue = [
        "BackgroundColorList:",
        bgColorList.join(", "),
        "\r\nForegroundColorList:",
        textColorList.join(", ")
      ].join("\r\n");

      this.showColorValue = !this.showColorValue;

      this.showColorValue && console.log(this.colorListValue);
    }
  }
};
</script>

<style lang="scss">
.el-tooltip__popper {
  font-size: 13px;
  font-family: "Courier New", Courier, monospace;
}
</style>
<style lang="scss" scoped>
.colors-generator {
  font-size: 14px;
  font-family: "-apple-system", BlinkMacSystemFont, "Segoe UI", sans-serif;
  margin: 26px;

  .form-input {
    width: 6em;
  }

  .color-list {
    list-style: none;
    display: flex;
    padding: 0;
    flex-wrap: wrap;

    .cell {
      padding: 8px;
      margin: 6px;
      min-width: 60px;
      text-align: center;
      border-radius: 4px;
    }
  }

  .color-list-value {
    margin: 16px;
  }

  .input-number {
    width: 9em;
  }
}
</style>
