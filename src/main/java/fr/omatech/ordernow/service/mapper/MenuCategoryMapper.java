package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.MenuCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MenuCategory} and its DTO {@link MenuCategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {MenuMapper.class})
public interface MenuCategoryMapper extends EntityMapper<MenuCategoryDTO, MenuCategory> {

    @Mapping(source = "menu.id", target = "menuId")
    MenuCategoryDTO toDto(MenuCategory menuCategory);

    @Mapping(target = "listProducts", ignore = true)
    @Mapping(target = "removeListProduct", ignore = true)
    @Mapping(source = "menuId", target = "menu")
    MenuCategory toEntity(MenuCategoryDTO menuCategoryDTO);

    default MenuCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        MenuCategory menuCategory = new MenuCategory();
        menuCategory.setId(id);
        return menuCategory;
    }
}
