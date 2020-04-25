package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.MenuDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Menu} and its DTO {@link MenuDTO}.
 */
@Mapper(componentModel = "spring", uses = {RestaurantMapper.class})
public interface MenuMapper extends EntityMapper<MenuDTO, Menu> {

    @Mapping(source = "restaurant.id", target = "restaurantId")
    MenuDTO toDto(Menu menu);

    @Mapping(target = "listFormules", ignore = true)
    @Mapping(target = "removeListFormule", ignore = true)
    @Mapping(target = "listCategories", ignore = true)
    @Mapping(target = "removeListCategory", ignore = true)
    @Mapping(source = "restaurantId", target = "restaurant")
    Menu toEntity(MenuDTO menuDTO);

    default Menu fromId(Long id) {
        if (id == null) {
            return null;
        }
        Menu menu = new Menu();
        menu.setId(id);
        return menu;
    }
}
