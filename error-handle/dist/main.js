"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Err_Interceptor_1 = require("./common/Error/Err.Interceptor");
const res_interceptor_1 = require("./common/Response/res.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalFilters(new Err_Interceptor_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new res_interceptor_1.ResponseInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map