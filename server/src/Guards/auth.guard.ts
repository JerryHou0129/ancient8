import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/Modules/auth/auth.service';

interface IWhiteList {
  method: string
  path?: string
  regExp?: RegExp
}

@Injectable()
export class AuthGuard implements CanActivate {
  private whiteList: IWhiteList[] = []
  constructor(
    private authService: AuthService,
    {whitelist}: {whitelist: IWhiteList[]} 
  ) {
    this.whiteList = whitelist
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const currentMethod = request.method
    const currentPath = request.path
    const isMatchedRequest = this.whiteList.some(
      ({ method, path, regExp }) => method === currentMethod && (path === currentPath || regExp?.test?.(currentPath)),
    )

    if (isMatchedRequest) {
      return true
    }


    const token = request.headers.authorization
    if (!token) throw new UnauthorizedException();
    await this.authService.decode(token)
    return true
  }

}
