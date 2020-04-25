package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A MenuCategory.
 */
@Entity
@Table(name = "menu_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MenuCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label")
    private String label;

    @OneToMany(mappedBy = "menuCategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> listProducts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("listCategories")
    private Menu menu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public MenuCategory label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Set<Product> getListProducts() {
        return listProducts;
    }

    public MenuCategory listProducts(Set<Product> products) {
        this.listProducts = products;
        return this;
    }

    public MenuCategory addListProduct(Product product) {
        this.listProducts.add(product);
        product.setMenuCategory(this);
        return this;
    }

    public MenuCategory removeListProduct(Product product) {
        this.listProducts.remove(product);
        product.setMenuCategory(null);
        return this;
    }

    public void setListProducts(Set<Product> products) {
        this.listProducts = products;
    }

    public Menu getMenu() {
        return menu;
    }

    public MenuCategory menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MenuCategory)) {
            return false;
        }
        return id != null && id.equals(((MenuCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MenuCategory{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
