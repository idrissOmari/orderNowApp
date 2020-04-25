package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.MenuCategory} entity.
 */
public class MenuCategoryDTO implements Serializable {
    
    private Long id;

    private String label;


    private Long menuId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MenuCategoryDTO menuCategoryDTO = (MenuCategoryDTO) o;
        if (menuCategoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), menuCategoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MenuCategoryDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", menuId=" + getMenuId() +
            "}";
    }
}
