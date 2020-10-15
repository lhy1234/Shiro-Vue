package com.nb.shiro.service;

import com.nb.shiro.entity.SysRolePermission;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 角色权限表 服务类
 * </p>
 *
 * @author 
 * @since 2020-09-10
 */
public interface SysRolePermissionService extends IService<SysRolePermission> {

    /**
     * 保存角色-权限
     * @param roleId 角色id
     * @param lastPermissionIds 上次的权限 id
     * @param newPermissionIds 新的权限id
     */
    void saveRolePermission(String roleId, List<String> lastPermissionIds, List<String>  newPermissionIds);
}
